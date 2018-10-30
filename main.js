var listOfProducts;

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
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.

    // we create a div  and to pass all products inside it
    var divForThePictures = document.createElement("div");
    divForThePictures.classList.add("position-relative")
    divForThePictures.classList.add("container")
   

        // we loop threw every single product
        for(var i = 0; i<listOfProducts.length; i++){
            //we create a function  and send our index of products
            var addingSingleProduct = addPropertyToProduct(listOfProducts[i]);
            divForThePictures.appendChild(addingSingleProduct)
        }
        document.body.appendChild(divForThePictures)
    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    // TODO: Remove the console.log and these comments when you've read them.
}

function addPropertyToProduct(listOfProducts){
        // In this function we just call all of the other functions which containes the created elements
        var addingSingleProduct = document.createElement("div");
        addingSingleProduct.classList.add("column")
    

    // Call the funtions of the elememnts
        addingSingleProduct.appendChild(addProductName());
        addingSingleProduct.appendChild(addProductPrice());
        addingSingleProduct.appendChild(addProductImages());
        addingSingleProduct.appendChild(addProductDescription());
        addingSingleProduct.appendChild(addShoppingButton());
        
        return addingSingleProduct;
}



// Create h3 elements to add the names of the products
function addProductName () {
    var productName = document.createElement("h3");
    productName.classList.add("col-sm-12"); 
    productName.classList.add("text-center"); 
    productName.innerText =listOfProducts.title
    return productName;
}

 // Create h3 elements to add the prices of the products
 function addProductPrice () {
    var productPrice = document.createElement("h3");
    productPrice.classList.add("text-center");
    productPrice.classList.add("col");  
    productPrice.classList.add("align-bottom");  
    productPrice.innerText = listOfProducts.price
    return productPrice;
 }

 // Create images of the products
 function addProductImages () {
    var productImg = document.createElement("img");
    productImg.classList.add("col"); 
    productImg.classList.add("img-fluid");
    productImg.src = listOfProducts.image;
    return productImg;
 }

 // Create the descriptions of the products
 function addProductDescription () {
    var productDescription = document.createElement("p");
    productDescription.innerText = listOfProducts.description
    productDescription.classList.add("col"); 
    productDescription.classList.add("text-center");
    return productDescription;
 }

// Create shopping button here
function addShoppingButton () {
    var shoppingProductButton = document.createElement("shoppingProductButton");
    shoppingProductButton.innerText = "Lägg till i kundvagnen";
    shoppingProductButton.classList.add("btn-primary")
    shoppingProductButton.classList.add("btn-sm")
    shoppingProductButton.classList.add("text-center");
    shoppingProductButton.classList.add("col");
    return shoppingProductButton;
}