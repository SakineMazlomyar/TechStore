var listOfProducts;
var addingSingleProduct;
localStorage.setItem("shoppingCart", "[]");

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("http://127.0.0.1:5500/./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}

function initSite() {
    loadProducts();
    updateNumberOfChosenProducts(); // Here we call the function with which we count the number of chosen products
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {

    // Check your console to see that the products are stored in the listOfProducts varible.

    // We create a div  and to pass all products inside it
    var divForThePictures = document.createElement("div");
    //divForThePictures.classList.add("position-relative", "container")

    // We loop threw every single product
    for(var i = 0; i < listOfProducts.length; i++) {
        //we create a function  and send our index of products then we call those function here
        divForTheProduct = createProductDiv();

        divForTheProduct.appendChild(createProductName(listOfProducts[i]));
        divForTheProduct.appendChild(createProductDescription(listOfProducts[i]));
        divForTheProduct.appendChild(createProductImage(listOfProducts[i]));
        divForTheProduct.appendChild(createProductPrice(listOfProducts[i]));
        divForTheProduct.appendChild(createShoppingButton(listOfProducts[i]));

        divForThePictures.appendChild(divForTheProduct);
    }
    document.body.appendChild(divForThePictures);
}
    
function createProductDiv() {
    // we make a div for every property and call it from addProductToWebPage
    var addingSingleProduct = document.createElement("div");
    addingSingleProduct.classList.add("d-flex", "flex-column", "height", "align-items-center");
    return addingSingleProduct;
}

// Here comes the creating of the elements in separeted functions
// Create h3 elements to add the names of the products
function createProductName(productInfo) {
    var productName = document.createElement("h3");
    productName.innerText = productInfo.title;
    return productName;
}

// Create images of the products
function createProductImage(productInfo) {
    var productImg = document.createElement("img");
    productImg.classList.add("widthtImg", "img-fluid");
    productImg.src = productInfo.image;
    return productImg;
}

// Create h3 elements to add the prices of the products
function createProductPrice(productInfo) {
    var productPrice = document.createElement("h3");
    productPrice.innerText = productInfo.price +"kr";
    return productPrice;
}

// Create the descriptions of the products
function createProductDescription(productInfo) {
    var productDescription = document.createElement("h6");
    productDescription.innerText = productInfo.description;
    return productDescription;
}

// Create shopping button here
function createShoppingButton(productInfo) {
    var shoppingProductButton = document.createElement("button");
    shoppingProductButton.innerText = "Lägg till i kundvagnen";
    shoppingProductButton.classList.add("btn-primary", "btn-sm");
    shoppingProductButton.onclick = function() { onShoppingProductButtonClick(productInfo); };
    return shoppingProductButton;
} 

// Handle shoppingProductButton
function onShoppingProductButtonClick(productInfo) {
    var shoppingCartString = localStorage.getItem("shoppingCart");
    var shoppingCartJson = JSON.parse(shoppingCartString);
    shoppingCartJson.push(productInfo);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartJson));
    updateNumberOfChosenProducts();
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    var productNumberIndicator = document.getElementById("number-of-chosen-products");
    var shoppingCartString = localStorage.getItem("shoppingCart");
    var shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
}