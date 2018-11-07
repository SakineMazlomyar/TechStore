
/* This is needed for see if somebody is logged in or not */
if (!("loggedInAs" in localStorage)) {
    localStorage.setItem("loggedInAs", "");
}

/** Get products from the json file and store it in a gobal variable */
var listOfProducts;

function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage(listOfProducts);
    });
}

function initSite() {
    if (!("shoppingCart" in localStorage)) {
        localStorage.setItem("shoppingCart", "[]");
    }
    loadProducts();
    updateNumberOfChosenProducts(); // Here we call the function to which we count the number of chosen products
    // This would also be a good place to initialize other parts of the UI
    displayTheLoggedInUsername();
}

function initShoppingCart() {
    var shoppingCartString = localStorage.getItem("shoppingCart");
    var shoppingCartJson = JSON.parse(shoppingCartString);
    addProductsToWebpage(shoppingCartJson);
    updateNumberOfChosenProducts();
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage(listOfProducts) {

    // Check your console to see that the products are stored in the listOfProducts varible.

    // We create a div and put all products inside it
    var divForThePictures = document.createElement("div");
    divForThePictures.classList.add("container")

    // We loop threw every single product
    for(var i = 0; i < listOfProducts.length; i++) {
        //we create a function and send our index of products then we call those function here
        divForTheProduct = createProductDiv();
        createProductName(listOfProducts[i]);
        createProductDescription(listOfProducts[i]);
        createProductImage(listOfProducts[i]);
        createProductPrice(listOfProducts[i]);
        createShoppingButton(listOfProducts[i]);
        
        divForThePictures.appendChild(divForTheProduct);
    }
    document.body.appendChild(divForThePictures);
}
    
function createProductDiv() {
    // we make a div for every property and call it from addProductToWebPage
    var addingSingleProduct = document.createElement("div");
    addingSingleProduct.classList.add("d-flex", "flex-column", "align-items-center", "pt-5");
    return addingSingleProduct;
}

// Here comes the creating of the elements in separated functions

// Creating h2 elements for the names of the products
function createProductName(listOfProducts) {
    var productName = document.createElement("h2");
    productName.innerText = listOfProducts.title;
    divForTheProduct.appendChild(productName)
    return productName;
}

// Creating images of the products
function createProductImage(listOfProducts) {
    var productImg = document.createElement("img");
    productImg.classList.add("widthtImg");
    productImg.src = listOfProducts.image;
    divForTheProduct.appendChild(productImg)
    return productImg;
}

// Creating h3 elements to add prices of the products
function createProductPrice(listOfProducts) {
    var productPrice = document.createElement("h3");
    productPrice.innerText = listOfProducts.price +"kr";
    divForTheProduct.appendChild(productPrice)
    return productPrice;
}

// Creating the descriptions of the products
function createProductDescription(listOfProducts) {
    var productDescription = document.createElement("h4");
    productDescription.innerText = listOfProducts.description;
    productDescription.classList.add("text-center",);
    divForTheProduct.appendChild(productDescription)
    return productDescription;
}

// Creating shopping button here
function createShoppingButton(listOfProducts) { 
    var shoppingProductButton = document.createElement("button");
    shoppingProductButton.innerText = "Lägg till i kundvagnen";
    shoppingProductButton.classList.add("btn-primary", "btn-sm");
    shoppingProductButton.onclick = function() { onShoppingProductButtonClick(listOfProducts); };
    divForTheProduct.appendChild(shoppingProductButton)
    return shoppingProductButton;
} 

// Handle shoppingProductButton
function onShoppingProductButtonClick(listOfProducts) {
    var shoppingCartString = localStorage.getItem("shoppingCart");

    //Byt Namn? (shoppingCartJson)
    var shoppingCartJson = JSON.parse(shoppingCartString);

    // Add a property to the object to distinguish mobiles of the same brand
    //Add an unique IdNr
	var date = new Date();
	var timeStamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();	
	listOfProducts["IdNr"] = timeStamp;

    shoppingCartJson.push(listOfProducts);
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

function displayTheLoggedInUsername() {
    var loggedInUserDiv = document.getElementById('loggedInUsernameDiv');
    var loggedInUsername = localStorage.getItem("loggedInAs");
    if (!(loggedInUsername === "")) {
        loggedInUserDiv.innerText = "Hi, " + loggedInUsername + "!";
    }
}
