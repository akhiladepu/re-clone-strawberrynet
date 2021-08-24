
var user = JSON.parse(localStorage.getItem("users"));
if (user != null) {
    var userNameDisplay = document.getElementById("userNameDisplay");
    userNameDisplay.innerHTML = `${user[0].fName}`;
}


        window.onscroll = function () { myFunction() };

var navbar = document.getElementById("sample");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

var data_div = document.getElementById("wishlistProductsShowCase");

function showProducts(data) {
    var productsData = data;

    data_div.innerHTML = "";

    data.forEach(function (object){
        addProductsToBrowser(object);
    });
}
var brandsObject = {};
var categoryObject = {};
var products = JSON.parse(localStorage.getItem('wishlist'));

showProducts(products);

function addProductsToBrowser(object) {
    
    var div = document.createElement("div");
    div.setAttribute("class", "product");

    
    let wishlistIcon = document.createElement("div");
    wishlistIcon.innerHTML = `<div class="heartimg"><button onclick="removeFromWishlist('${object.name}','${object.brand}','${object.price}','${object.category}')" class="wishlist-icon-fill" id="whishlistItem"></button></div>`;
    let pImage = document.createElement("img");
    pImage.setAttribute("class","productImage")
    pImage.src = object.image;
  
    let pBrandAndName = document.createElement("div");
    pBrandAndName.setAttribute("class", "productBrandAndName");

    let pBrand = document.createElement("div");
    pBrand.setAttribute("class", "productBrand");
    pBrand.innerHTML = object.brand;


    if (brandsObject[object.brand] == undefined) {
        brandsObject[object.brand] = 1;
    } else {
        let prev = brandsObject[object.brand];
        brandsObject[object.brand] += 1;
    }

    if (categoryObject[object.category] == undefined) {
        categoryObject[object.category] = 1;
    } else {
        let prev = categoryObject[object.category];
        categoryObject[object.category] += 1;
    }
    
    let pName = document.createElement("span");
    pName.setAttribute("class", "productName");
    pName.innerHTML = object.name;

    pBrandAndName.append(pBrand, pName);
    
    let pDiscount = document.createElement("div");
    pDiscount.setAttribute("class", "productDiscount");


    let pPreviousPrice = document.createElement("div");
    pPreviousPrice.setAttribute("class", "productPreviousPrice");

    if (object.discount != 0) {
        pDiscount.innerHTML = `SAVE ${object.discount}%`;

        let pPrePrice = Number(object.price) + Number(object.price * object.discount);
        pPreviousPrice.innerHTML = `<div><span>RRP  </span><span class="productPrePrice">Rs. ${pPrePrice}</span></div>`;
    } else {
        pDiscount.innerHTML = "";

        pPreviousPrice.innerHTML = "";
    }
    
    let pPrice = document.createElement("div");
    pPrice.setAttribute("class", "productPrice");
    pPrice.innerHTML = `Rs. ${object.price}`;


    let btn = document.createElement("button");
    btn.setAttribute("class", "productButton");
    btn.textContent = "Add to bag";
    btn.addEventListener("click", function () {
        addToBag(object);
    });    
    btn.style.display = "block";  

    
    let pRating = document.createElement("span");
    let rate = `<span class="productRating">`;
    for (var i = 1; i <= Number(object.rating); i++){
        rate += `<img alt="" src="https://a.cdnsbn.com/images/common/star_full.gif"></img>`

    }
    for (var i = 1; i <= 5 - Number(object.rating); i++){
        rate += `<img alt="" src="https://a.cdnsbn.com/images/common/star_empty.gif">`
    }
    rate += `</span>`;
    pRating.innerHTML = rate;

    
    let pExtraDiscount = document.createElement("div");
    pExtraDiscount.setAttribute("class", "productExtraDiscount");
    pExtraDiscount.innerHTML = "Extra 8% Off";

    div.append( wishlistIcon, pImage, pBrandAndName, pDiscount, pPrice, pPreviousPrice, btn, pRating, pExtraDiscount);

    data_div.append(div);
    
}

function removeFromWishlist(objName, objBrand, objPrice, objCategory) {
    products;
    let i = 0;
    let temp = 0;
    var newProductsArray = [];
    for (i = 0; i < products.length; i++) {
        if (products[i].brand == objBrand && products[i].name == objName && products[i].category == objCategory && products[i].price == objPrice) {
            console.log('got culprit');
            console.log()
        } else {
            newProductsArray.push(products[i]);
        }
    }
    
    console.log('newProductsArray:', newProductsArray);
    products = newProductsArray;
    
    showProducts(products);
}

function addToBag(obj) {

    console.log(obj);

    let array;

    array = localStorage.getItem("bag");

    if (array == null) {

        array = [];
        array.push(obj);
    
        localStorage.setItem("bag", JSON.stringify(array));

    } else {

        array = JSON.parse(localStorage.getItem("bag"));
    
        let found = false;

        for (var i = 0; i < array.length; i++) {
            if (array[i].name == obj.name) {
                found = true;
                break;
            }
        }

        if (found == false) {

            array.push(obj);

        }
    
        localStorage.setItem("bag", JSON.stringify(array));
    }
}



var append_div = document.getElementById("wishListShowTotalProductsDiv");
var sample = document.createElement("div");
for (key in categoryObject) {
    let ele = document.createElement("a");

    ele.innerHTML = `<a onclick='filterByCategory("${key}")' class="categoryHover">${key} (${categoryObject[key]})</a><br>`;

    sample.append(ele);
}

append_div.append(sample);

function filterByCategory(categoryType) {

    products;
    var reqCategory = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i].category == categoryType) {
            reqCategory.push(products[i]);
        }
    }
    showProducts(reqCategory);
}



var append_div = document.getElementById("scrollSectionBrands");
var sample = document.createElement("div");

for (key in brandsObject) {
    let ele = document.createElement("a");

    ele.innerHTML = `<label class="checkbox"><input type="checkbox"  class="filterBrands" onclick="filterBrands('${key}')" value="${key}" id="${key}"><span>${key} (${brandsObject[key]})</span></label>`;

    sample.append(ele);
}

append_div.append(sample);


    var prod = [];
function filterBrands(value) {
    products;
    let i = 0;
    var valueChecked = document.getElementById(value);
    if (valueChecked.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].brand == value) {
                prod.push(products[i]);
            }
        }
    } else if(valueChecked.checked == false){
        let temp = 0;
        for (var j = 0; j < prod.length; j++){
            if (prod[j].brand == value) {
                temp = j;
                break;
            }
        }


        var rem = prod.splice(temp);

        for (var j = 0; j < rem.length; j++){

            if (rem[j].brand != value) {
                temp = j;
                break;
            } else {
                temp = rem.length;
            }
        }


        for (temp; temp < rem.length; temp++){
            if (rem[temp] != undefined) {
                prod.push(rem[temp]);
            }
        }
    }
    
    showProducts(prod);
    if (prod.length == 0) {
        showProducts(products);
    }
}

function popularity() {
    var buttonName = document.getElementById("sortButtonName");
    buttonName.innerHTML = `SORT BY POPULARITY <a id="glyphicon">`;
    var popular = [];
    var productsData = products;
    for (var i = 0; i < productsData.length; i++) {
        if (productsData[i].rating == 5) {
            popular.push(productsData[i]);
        }
    }

    showProducts(popular);
}
function biggestDiscount() {
    var buttonName = document.getElementById("sortButtonName");
    buttonName.innerHTML = `SORT BY BIGGEST DISCOUNT <a id="glyphicon">`;
    var bigDiscount = [];
    var productsData = products;
    for (var i = 0; i < productsData.length; i++) {
        if (productsData[i].discount >= 30) {
            bigDiscount.push(productsData[i]);
        }
    }

    showProducts(bigDiscount);
}
function lowestPrice() {
    var buttonName = document.getElementById("sortButtonName");
    buttonName.innerHTML = `SORT BY LOWEST PRICE <a id="glyphicon">`;
    var productsData = products;

    productsData.sort(function (a, b) {
        return a.price - b.price;
    })

    showProducts(productsData)
}
function brandAZ() {
    var buttonName = document.getElementById("sortButtonName");
    buttonName.innerHTML = `SORT BY BRAND: A-Z<a id="glyphicon">`;
    brandsObject;
    products;
    var brandsArray = []

    for (key in brandsObject) {
        brandsArray.push(key);
    }

    brandsArray = brandsArray.sort();

    var brandsAZ = [];
    
    for (var i = 0; i < brandsArray.length; i++) {

        for (j = 0; j < products.length; j++) {
            if (brandsArray[i] == products[j].brand) {
                brandsAZ.push(products[j]);
            }
        }

    }

    showProducts(brandsAZ);
}
function productAZ() {
    var buttonName = document.getElementById("sortButtonName");
    buttonName.innerHTML = `SORT BY PRODUCT: A-Z <a id="glyphicon">`;
    
    products;
    
    showProducts(products);
}