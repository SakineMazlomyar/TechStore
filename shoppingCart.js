function initShoppingCart() {
    
    if (!("shoppingCart" in localStorage)) {
        localStorage.setItem("shoppingCart", "[]");
    }
    var productInCart = localStorage.getItem("shoppingCart");
    var productCartList = JSON.parse(productInCart);
    
    updateNumberOfChosenProducts();
    ProductsInKundvagnWebPage(productCartList);
    countTotalPrice()
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    var productNumberIndicator = document.getElementById("number-of-chosen-products");
    var shoppingCartString = localStorage.getItem("shoppingCart");
    var shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
    
}

function ProductsInKundvagnWebPage (productCartList) {
    var divForHeader;
    var divForTheProductCartList = document.createElement("div");
    var divForAllProductsInRow = document.createElement("div");
    var mainStuff = document.getElementById("mainContent");
    
    divForHeader = shoppingCartHeader();
    divForAllProductsInRow = divProductRow();

    for(var i = 0; i < productCartList.length; i++) {
        
        divForSingleProduct = productDiv();
        createImageFromProductList(productCartList[i]);
        createTitleFromProductList(productCartList[i]);
        createPriceFromProductList(productCartList[i]);
        createDeleteButton(productCartList[i]);

        divForAllProductsInRow.appendChild(divForSingleProduct)
        
    }
    divForTheProductCartList.appendChild(divForAllProductsInRow);
   
    //add header and all products to main.
    mainStuff.appendChild(divForHeader);
    mainStuff.appendChild(divForAllProductsInRow);
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

function createImageFromProductList(productCartList) {
    var imageProduct = document.createElement("img");
    imageProduct.classList.add("wideImg");
    imageProduct.src = productCartList.image;
    divForSingleProduct.appendChild(imageProduct);
}

function createTitleFromProductList(productCartList) {
    var titleProduct = document.createElement("h1");
    titleProduct.classList.add("font-weight-bold");
    titleProduct.innerText = productCartList.title;
    divForSingleProduct.appendChild(titleProduct);
    return titleProduct;
}

function createPriceFromProductList(productCartList) {
    var priceProduct = document.createElement("h5");
    priceProduct.classList.add("font-weight-bold");
    priceProduct.innerText = productCartList.price + "kr";
    divForSingleProduct.appendChild(priceProduct);
    return priceProduct;
}

//create delete button here
function createDeleteButton(productCartList) {
    var deleteButton = document.createElement("button");
    //deletebutton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.innerText = "Ta bort";
    deleteButton.classList.add("btn-danger", "btn-lg", "buttonCart");
    deleteButton.onclick = function() { deleteButtonClick(productCartList) };
    divForSingleProduct.appendChild(deleteButton);
    return deleteButton;
}

//create delete function here
function deleteButtonClick(productCartList) {

    var ItemToDelete = localStorage.getItem("shoppingCart");
    var deleteProduct = JSON.parse(ItemToDelete);
    var index = 0;
    

    for(var i = 0; i < deleteProduct.length; i++) {
        if(productCartList.IdNr == deleteProduct[i].IdNr) {
            index = i;
        }
    };
    
    deleteProduct.splice(index, 1);
    localStorage.setItem("shoppingCart", JSON.stringify(deleteProduct));
 
    // clear content in main.
    document.getElementById("mainContent").innerHTML = "";
    //reload shoppingcart
    initShoppingCart();
    
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
