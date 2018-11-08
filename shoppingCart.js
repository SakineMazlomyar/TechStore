var listOfProducts;
var productCartJson;

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
    
    if (!("shoppingCart" in localStorage)) {
        localStorage.setItem("shoppingCart", "[]");
    }
    var productInCart = localStorage.getItem("shoppingCart");
    productCartJson = JSON.parse(productInCart);

    ProductsInKundvagnWebPage(listOfProducts);
    updateNumberOfChosenProducts();
    countTotalPrice()
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    var productNumberIndicator = document.getElementById("number-of-chosen-products");
    var shoppingCartString = localStorage.getItem("shoppingCart");
    var shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
    
}

function ProductsInKundvagnWebPage (productCartJson) {
    var divForHeader = document.createElement("div");
    var divForTheProductsInKundvagn = document.createElement("div");
    var divForAllProductsRow = document.createElement("div");
    var productInCart = localStorage.getItem("shoppingCart");
    var productCartJson = JSON.parse(productInCart);
    
    divForHeader = shoppingCartHeader();
    divForAllProductsRow = divProductRow();


 for(var i = 0; i < productCartJson.length; i++) {
        
        divForTheProducts = productDiv();
        imageProductInCart(productCartJson[i]);
        titleProductInCart(productCartJson[i]);
        priceProductInCart(productCartJson[i]);
        createDeleteButton(productCartJson[i])
        

        
        divForAllProductsRow.appendChild(divForTheProducts)
        //divForTheProductsInKundvagn.appendChild(divForTheProducts);
    }

    divForTheProductsInKundvagn.appendChild(divForAllProductsRow);
    document.body.appendChild(divForHeader);
    document.body.appendChild(divForTheProductsInKundvagn);

}

//Header for "kundvagn.html"
function shoppingCartHeader() {
    var cartHeader = document.createElement("div");
    cartHeader.classList.add("container", "text-center", "font-weight-bold");
    cartHeader.innerHTML = '<i class="fas fa-shopping-cart"></i> ' + "Kundvagn";
    return cartHeader;
}

function divProductRow() {
    AllProductsRow = document.createElement("div");
    AllProductsRow.classList.add("container", "d-flex", "divRow", "flex-wrap", "justify-content-center");
    return AllProductsRow;
}

function productDiv() {
    var oneProductDiv = document.createElement("div");
    oneProductDiv.classList.add("d-flex", "flex-column", "align-items-center", "divProduct");
    AllProductsRow.appendChild(oneProductDiv);
    return oneProductDiv;
}

function imageProductInCart(productCartJson) {
    var imageProduct = document.createElement("img");
    imageProduct.classList.add("wideImg");
    imageProduct.src = productCartJson.image;
    divForTheProducts.appendChild(imageProduct);
}

function titleProductInCart(productCartJson) {
    var titleProduct = document.createElement("h1");
    titleProduct.classList.add("font-weight-bold");
    titleProduct.innerText = productCartJson.title;
    divForTheProducts.appendChild(titleProduct);
    return titleProduct;
}

function priceProductInCart(productCartJson) {
    var priceProduct = document.createElement("h5");
    priceProduct.classList.add("font-weight-bold");
    priceProduct.innerText = productCartJson.price + "kr";
    divForTheProducts.appendChild(priceProduct);
    return priceProduct;
}

//create delete button here
function createDeleteButton(productCartJson) {
    var deleteButton = document.createElement("button");
    //deletebutton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.innerText = "Ta bort";
    deleteButton.classList.add("btn-danger", "btn-lg", "buttonCart");
    deleteButton.onclick = function() { deleteButtonClick(productCartJson) };
    divForTheProducts.appendChild(deleteButton);
    return deleteButton;
}

//create delete function here
function deleteButtonClick(productCartJson) {

    var ItemToDelete = localStorage.getItem("shoppingCart");
    var JsonToDelete = JSON.parse(ItemToDelete);
    var index = 0;

    for(var i = 0; i < JsonToDelete.length; i++) {
        if(productCartJson.IdNr == JsonToDelete[i].IdNr) {
            index = i;
        }
    };
    
    JsonToDelete.splice(index, 1);
    localStorage.setItem("shoppingCart", JSON.stringify(JsonToDelete));
    updateNumberOfChosenProducts();
    location.reload(false);
};

function countTotalPrice(){
    /* we get the string array from localstorage and parse it to js array
    we get the price of each obj and sum them and pun in body
     */
    var totalPrice = 0;
    var choosenProducts = localStorage.getItem("shoppingCart");
    var choosenProductsToArray = JSON.parse(choosenProducts);
    choosenProductsToArray.forEach(function(product){
        totalPrice += product.price;
    }); 

    var divForTotalPrice = document.createElement("div");
    divForTotalPrice.classList.add("text-center")
    var h1 = document.createElement("h1")
    h1.innerText = "Totalt Pris: " + totalPrice + "kr";
    divForTotalPrice.appendChild(h1);
    document.body.appendChild(divForTotalPrice)

}
/* test */
/* test again for branch */