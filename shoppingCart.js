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
    totalPrice()
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
    var productInCart = localStorage.getItem("shoppingCart");
    var productCartJson = JSON.parse(productInCart);
    
    divForHeader = shoppingCartHeader();

 for(var i = 0; i < productCartJson.length; i++) {
        
        divForTheProduct = productDiv();
        imageProductInCart(productCartJson[i]);
        titleProductInCart(productCartJson[i]);
        priceProductInCart(productCartJson[i]);
        createDeleteButton(productCartJson[i])
        


        divForTheProductsInKundvagn.appendChild(divForTheProduct);
    }

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


function productDiv() {
    var oneProductDiv = document.createElement("div");
    oneProductDiv.classList.add("d-flex", "flex-column", "align-items-center", "width");
    return oneProductDiv;
}

function imageProductInCart(productCartJson) {
    var imageProduct = document.createElement("img");
    imageProduct.classList.add("widthtImg");
    imageProduct.src = productCartJson.image;
    divForTheProduct.appendChild(imageProduct);
}

function titleProductInCart(productCartJson) {
    var titleProduct = document.createElement("h1");
    titleProduct.classList.add("font-weight-bold");
    titleProduct.innerText = productCartJson.title;
    divForTheProduct.appendChild(titleProduct);
    return titleProduct;
}

function priceProductInCart(productCartJson) {
    var priceProduct = document.createElement("h5");
    priceProduct.classList.add("font-weight-bold");
    priceProduct.innerText = productCartJson.price + "kr";
    divForTheProduct.appendChild(priceProduct);
    return priceProduct;
}

//create delete button here
function createDeleteButton(productCartJson) {
    var deleteButton = document.createElement("button");
    //deletebutton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.innerText = "Ta bort";
    deleteButton.classList.add("btn-danger", "btn-lg");
    deleteButton.onclick = function() { deleteButtonClick(productCartJson) };
    divForTheProduct.appendChild(deleteButton);
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

function totalPrice(){
    var singlePrice = []
    var value = 0;
    var choosenProducts = localStorage.getItem("shoppingCart");
    var choosenProductsToArray = JSON.parse(choosenProducts);
    choosenProductsToArray.forEach(function(product){
        value += product.price;
        singlePrice.push(value)
    })
    console.log(value)
    //for(var i = 0; i<singlePrice.length; i++){
       /*  for(var j = 0; j<singlePrice.length -1; j++){ */
/*             var sum = singlePrice[i]
            console.log(singlePrice[i] + singlePrice[i + 1]);
            singlePrice[i +1] = sum;
            break
        
        } */
        
    
    
   
    
    
    /* we get the length of our converted array 
    and multiply with amount of phones and insert on body
     */
/*     if(choosenProductsToArray.length >= 1){
        var totalPrice = value*choosenProductsToArray.length
        var divForTotalPrice = document.createElement("div");
        divForTotalPrice.classList.add("bg")
        var h1 = document.createElement("h4")
        h1.innerText = "Totalt Pris: " + totalPrice + "kr";
        divForTotalPrice.appendChild(h1)
        document.body.appendChild(divForTotalPrice)
        

    } */

}