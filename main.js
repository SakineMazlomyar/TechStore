var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
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
    //divForThePictures.classList.add("mh")
        // we loop threw every single product
        for(var i = 0; i<listOfProducts.length; i++){
            //we create a function  and send our index of products
            var addingSingleProduct = addingPropertyToProduct(listOfProducts[i]);
            divForThePictures.appendChild(addingSingleProduct)
        }
        document.body.appendChild(divForThePictures)
    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    // TODO: Remove the console.log and these comments when you've read them.
}

function addingPropertyToProduct(listOfProducts){
        // we create a div for every product
        var addingSingleProduct = document.createElement("div");
        //addingSingleProduct.classList.add("i")
    
        //we create a h3 for all names
        var getProcuctName = document.createElement("h3");
        getProcuctName.classList.add("text-center"); 
        getProcuctName.innerText =listOfProducts.title
    
        // we create a h3 for alla prices
        var getProductPrice = document.createElement("h3");
        getProductPrice.classList.add("text-center"); 
        //getProductPrice.classList.add("align-bottom"); 
        getProductPrice.innerText = listOfProducts.price
    
        //we create img for all img
        var getProductImg = document.createElement("img");
        getProductImg.classList.add("img-fluid");
        //getProductImg.classList.add("mh");
        getProductImg.src = listOfProducts.image;
     
        //we create p for all description
        var getProductDescription = document.createElement("p");
        getProductDescription.innerText = listOfProducts.description
    
       
        addingSingleProduct.appendChild(getProcuctName);
        addingSingleProduct.appendChild(getProductPrice);
        addingSingleProduct.appendChild(getProductImg);
        addingSingleProduct.appendChild(getProductDescription);
        return addingSingleProduct;

}