var listOfProducts;
var shoppingCartJson;

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


function initShoppingCart() {
    shoppingCartString = localStorage.getItem("shoppingCart");
    shoppingCartJson = JSON.parse(shoppingCartString);
    if (!("shoppingCart" in localStorage)) {
        localStorage.setItem("shoppingCart", "[]");
    }
    /*loadProducts();*/

    /*addProductsToWebpage(shoppingCartJson);*/
    ProductsInKundvagnWebPage(listOfProducts);
    updateNumberOfChosenProducts();
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    var productNumberIndicator = document.getElementById("number-of-chosen-products");
    var shoppingCartString = localStorage.getItem("shoppingCart");
    var shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
}

function ProductsInKundvagnWebPage (shoppingCartJson) {
   
    //var ProductInCart = localStorage.getItem("shoppingCart");

    var divForTheProductInKundvagn = document.createElement("div");

 for(var i = 0; i < shoppingCartJson.length; i++) {
        divForTheProduct = document.createElement("div");
        productName = productDiv(shoppingCartJson[i]);
    }

    divForTheProductInKundvagn.appendChild(divForTheProduct);

    

}

function productDiv() {
    var oneProductDiv = document.createElement("div");
    oneProductDiv.classList.add("d-flex", "flex-row", "justify-content-center");
    return oneProductDiv;
}

    var ProductInCart = localStorage.getItem("shoppingCart");
