var listOfProducts;
var addingSingleProduct;

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

    // We create a div  and to pass all products inside it
    var divForThePictures = document.createElement("div");
    //divForThePictures.classList.add("position-relative", "container")

        // We loop threw every single product
        for(var i = 0; i < listOfProducts.length; i++){
            //we create a function  and send our index of products then we call those function here
            addingSingleProduct = addPropertyToProduct(listOfProducts[i]);
            addProductName(listOfProducts[i])
            addProductDescription (listOfProducts[i])
            addProductImages (listOfProducts[i])
            addProductPrice (listOfProducts[i])
            addShoppingButton (listOfProducts[i])

            divForThePictures.appendChild(addingSingleProduct)
           
        }
        document.body.appendChild(divForThePictures)
  
    }
    
    
    
function addPropertyToProduct (listOfProducts) {
    // we make a div for every property and call it from addProductToWebPage
    var addingSingleProduct = document.createElement("div");
    addingSingleProduct.classList.add("d-flex", "flex-column", "height", "align-items-center", )
    
        
    return addingSingleProduct;
}
// Here comes the creating of the elements in separeted functions
// Create h3 elements to add the names of the products
function addProductName (listOfProducts) {
    var productName = document.createElement("h3");
    productName.innerText =listOfProducts.title
    addingSingleProduct.appendChild(productName)
    return productName;

}


// Create images of the products
function addProductImages (listOfProducts) {
    var productImg = document.createElement("img");
    productImg.classList.add("widthtImg");
    productImg.classList.add("img-fluid");
    

    productImg.src = listOfProducts.image;
    addingSingleProduct.appendChild(productImg);
    return productImg;
}

// Create h3 elements to add the prices of the products
function addProductPrice (listOfProducts) {
    var productPrice = document.createElement("h3");
    productPrice.innerText = listOfProducts.price +"kr"
    addingSingleProduct.appendChild(productPrice);
    return productPrice;

}

// Create the descriptions of the products
function addProductDescription (listOfProducts) {
    var productDescription = document.createElement("h6");
    productDescription.innerText = listOfProducts.description
    addingSingleProduct.appendChild(productDescription);
    return productDescription;
}

// Create shopping button here
function addShoppingButton (listOfProducts) {

    var shoppingProductButton = document.createElement("button");
    shoppingProductButton.innerText = "Lägg till i kundvagnen";
    shoppingProductButton.classList.add("btn-primary", "btn-sm")
    addingSingleProduct.appendChild(shoppingProductButton);
    return shoppingProductButton;
} 
