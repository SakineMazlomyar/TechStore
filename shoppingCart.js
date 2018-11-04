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

function initShoppingCart() {

    var shoppingCartString = localStorage.getItem("shoppingCart");
    /*var shoppingCartJson = JSON.parse(shoppingCartString);*/
    if (!("shoppingCart" in localStorage)) {
        localStorage.setItem("shoppingCart", "[]");
    }
    /*loadProducts();*/

    /*addProductsToWebpage(shoppingCartJson);*/
    updateNumberOfChosenProducts();
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    var productNumberIndicator = document.getElementById("number-of-chosen-products");
    var shoppingCartString = localStorage.getItem("shoppingCart");
    var shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
}