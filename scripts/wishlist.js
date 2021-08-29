var user = JSON.parse(localStorage.getItem("userId"));

const userId = user.id;

var brandsObject;
var categoryObject;

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

var wishlistProducts;
var bagProducts;

async function getUser(id) {
    
    try {
            
        var res = await fetch("http://localhost:2345/users");
        
        var reqData = await res.json();

        let user = [];

        for (let i = 0; i < reqData.length; i++){
            if (reqData[i]._id == id) {
                user = reqData[i];
                break;
            }
        }
        
        return user;

    } catch (err) {
        
    }

}

async function main(userId) {
    

    data_div.innerHTML = "";

    var user = await getUser(userId);

    if (user != null) {
        var userNameDisplay = document.getElementById("userNameDisplay");
        userNameDisplay.innerHTML = `${user.first_name}`;
    }
    wishlistProducts = [];
    for (let i = 0; i < user.wishlist.length; i++) {

        wishlistProducts.push(user.wishlist[i]);

    }
    bagProducts = [];
    for (let i = 0; i < user.bag.length; i++) {

        bagProducts.push(user.bag[i]);

    }
    if (bagProducts == undefined || bagProducts.length == 0 || bagProducts == null) {
    let div = document.getElementById("contain_bag");

    let bagCount = document.createElement("div");
    bagCount.setAttribute("id", "bagCount")
    bagCount.textContent = "0";

    div.append(bagCount);
} else{
    let div = document.getElementById("contain_bag");

    let bagCount = document.createElement("div");
    bagCount.setAttribute("id", "bagCount")
    bagCount.textContent = bagProducts.length;

    div.append(bagCount);
}

    showProducts(wishlistProducts, userId);
}

main(userId);
var countSample = 1;
function showProducts(data, userId) {

    
    
    brandsObject = {};
    categoryObject = {};

    data_div.innerHTML = "";
    data.forEach(function (object) {
        addProductsToBrowser(object, userId);
    });

    if (countSample == 1) {
        filterSection();
        countSample++;
    }
}

function addProductsToBrowser(object, userId) {

    var div = document.createElement("div");
    div.setAttribute("class", "product");


    let wishlistIcon = document.createElement("div");
    wishlistIcon.innerHTML = `<div class="heartimg"><button onclick="removeFromWishlist('${object.name}','${object.brand}','${object.price}','${object.category}', '${userId}')" class="wishlist-icon-fill" id="whishlistItem"></button></div>`;
    let pImage = document.createElement("img");
    pImage.setAttribute("class", "productImage")
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
        addToBag(object, userId);
    });
    btn.style.display = "block";


    let pRating = document.createElement("span");
    let rate = `<span class="productRating">`;
    for (var i = 1; i <= Number(object.rating); i++) {
        rate += `<img alt="" src="https://a.cdnsbn.com/images/common/star_full.gif"></img>`

    }
    for (var i = 1; i <= 5 - Number(object.rating); i++) {
        rate += `<img alt="" src="https://a.cdnsbn.com/images/common/star_empty.gif">`
    }
    rate += `</span>`;
    pRating.innerHTML = rate;


    let pExtraDiscount = document.createElement("div");
    pExtraDiscount.setAttribute("class", "productExtraDiscount");
    pExtraDiscount.innerHTML = "Extra 8% Off";

    div.append(wishlistIcon, pImage, pBrandAndName, pDiscount, pPrice, pPreviousPrice, btn, pRating, pExtraDiscount);

    data_div.append(div);

}

async function updateUser(newProductsArray, userId, str) {

    let data;
    
    if (str == "wishlist") {
        data = {
            _id: userId,
            wishlist: newProductsArray
        }        
    }else if (str == "bag") {
        data = {
            _id: userId,
            bag: newProductsArray
        }        
    }

    try {
        
        await fetch(`http://localhost:2345/users/${str}`, {
        
            method: "PATCH",
        
            body: JSON.stringify(data),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }

        });
    
        //var reqData = await res.json();

        // data_div.innerHTML = "";
        
        await main(userId);
    
        //return reqData;

    }
    catch (err) {

        console.log(err);

    }

}

async function removeFromWishlist(objName, objBrand, objPrice, objCategory, userId) {
    var newWishlistProducts = [];
    let i = 0;
    for (i = 0; i < wishlistProducts.length; i++) {
        if (wishlistProducts[i].brand == objBrand && wishlistProducts[i].name == objName && wishlistProducts[i].category == objCategory && wishlistProducts[i].price == objPrice) {

        } else {
            newWishlistProducts.push(wishlistProducts[i]);
        }
    }

    await updateUser(newWishlistProducts, userId, "wishlist");
    // window.location.href = "wishlist.html";
    filterSection();
}



async function addToBag(obj, userId) {

    // console.log(obj);

    bagProducts.push(obj);

    await updateUser(bagProducts, userId, "bag");

}


async function filterSection() {
    var append_div = document.getElementById("wishListShowTotalProductsDiv");
    append_div.innerHTML = "";
    var sample = document.createElement("div");
    for (key in categoryObject) {
        let ele = document.createElement("a");

        ele.innerHTML = `<a onclick='filterByCategory("${key}")' class="categoryHover">${key} (${categoryObject[key]})</a><br>`;

        sample.append(ele);
    }

    append_div.append(sample);

    var append_div = document.getElementById("scrollSectionBrands");
    append_div.innerHTML = "";
    var sample = document.createElement("div");

    for (key in brandsObject) {
        let ele = document.createElement("a");

        ele.innerHTML = `<label class="checkbox"><input type="checkbox"  class="filterBrands" onclick="filterBrands('${key}')" value="${key}" id="${key}"><span>${key} (${brandsObject[key]})</span></label>`;

        sample.append(ele);
    }

    append_div.append(sample);
}

function filterByCategory(categoryType) {

    products = wishlistProducts;
    var reqCategory = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i].category == categoryType) {
            reqCategory.push(products[i]);
        }
    }
    showProducts(reqCategory);
}

var prod = [];
function filterBrands(value) {
    products = wishlistProducts;
    let i = 0;
    var valueChecked = document.getElementById(value);
    if (valueChecked.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].brand == value) {
                prod.push(products[i]);
            }
        }
    } else if (valueChecked.checked == false) {
        let temp = 0;
        for (var j = 0; j < prod.length; j++) {
            if (prod[j].brand == value) {
                temp = j;
                break;
            }
        }


        var rem = prod.splice(temp);

        for (var j = 0; j < rem.length; j++) {

            if (rem[j].brand != value) {
                temp = j;
                break;
            } else {
                temp = rem.length;
            }
        }


        for (temp; temp < rem.length; temp++) {
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
    var productsData = wishlistProducts;
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
    var productsData = wishlistProducts;
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
    var productsData = wishlistProducts;

    productsData.sort(function (a, b) {
        return a.price - b.price;
    })

    showProducts(productsData)
}
function brandAZ() {
    var buttonName = document.getElementById("sortButtonName");
    buttonName.innerHTML = `SORT BY BRAND: A-Z<a id="glyphicon">`;
    brandsObject;
    var products = wishlistProducts;
    var brandsArray = [];

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

    var products = wishlistProducts;
    var productsArray = [];

    for (let i = 0; i < products.length; i++) {
        productsArray.push(products[i].name);
    }

    productsArray = productsArray.sort()

    var productsAZ = [];

    for (var i = 0; i < productsArray.length; i++){
        for (var j = 0; j < products.length; j++){
            if (productsArray[i] == products[j].name) {
                productsAZ.push(products[j]);
                break;
            }
        }
    }
    showProducts(productsAZ);
    }