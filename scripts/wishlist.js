// const user = {
//     "wishlist": [
//         {
//             "_id": "6125ab6f9b580e1dfcdb4815",
//             "brand": "Lancome",
//             "name": "GrandeLash MD (Lash Enhancing Serum) 2ml/0.07oz",
//             "discount": 10,
//             "price": 2916,
//             "image": "https://b.cdnsbn.com/images/products/250/25390680914.jpg",
//             "deal": "None",
//             "category": "Make Up",
//             "createdAt": "2021-08-25T02:31:11.392Z",
//             "updatedAt": "2021-08-25T02:31:11.392Z"
//         },
//         {
//             "_id": "6125ab6f9b580e1dfcdb4816",
//             "brand": "L'Occitane",
//             "name": "Aqua Allegoria Granada Salvia Eau De Toilette Spray 75ml/2.5oz",
//             "discount": 18,
//             "price": 3584,
//             "image": "https://d.cdnsbn.com/images/products/250/25737530744.jpg",
//             "deal": "New",
//             "category": "New Arrivals",
//             "createdAt": "2021-08-25T02:31:11.393Z",
//             "updatedAt": "2021-08-25T02:31:11.393Z"
//         },
//         {
//             "_id": "6125ab6f9b580e1dfcdb4817",
//             "brand": "Biotherm",
//             "name": "Homme Aquapower Cleanser 125ml/4.22oz",
//             "discount": 0,
//             "price": 3194.5,
//             "image": "https://c.cdnsbn.com/images/products/250/11459976721.jpg",
//             "deal": "Best",
//             "category": "Men's Skincare",
//             "createdAt": "2021-08-25T02:31:11.394Z",
//             "updatedAt": "2021-08-25T02:31:11.394Z"
//         }
//     ],
//     "bag": [
//         {
//             "_id": "6125ab6f9b580e1dfcdb4813",
//             "brand": "Serge Lutens",
//             "name": "La Fille De Berlin Eau De Parfum Spray 50ml/1.6oz",
//             "discount": 37,
//             "price": 7401.5,
//             "image": "https://a.cdnsbn.com/images/products/250/15728689106.jpg",
//             "deal": "Editor",
//             "category": "Perfume",
//             "createdAt": "2021-08-25T02:31:11.389Z",
//             "updatedAt": "2021-08-25T02:31:11.389Z"
//         },
//         {
//             "_id": "6125ab6f9b580e1dfcdb4814",
//             "brand": "Jo Malone",
//             "name": "Wood Sage & Sea Salt Scented Candle 200g (2.5inch)",
//             "discount": 12,
//             "price": 6428,
//             "image": "https://a.cdnsbn.com/images/products/250/18384289516.jpg",
//             "deal": "None",
//             "category": "Home Scents",
//             "createdAt": "2021-08-25T02:31:11.391Z",
//             "updatedAt": "2021-08-25T02:31:11.391Z"
//         }
//     ],
//     "_id": "6127123537633b50040b9f0f",
//     "first_name": "Test",
//     "last_name": "Test",
//     "email": "test@test.com",
//     "password": "test@000",
//     "createdAt": "2021-08-26T04:01:57.735Z",
//     "updatedAt": "2021-08-26T04:01:57.735Z"
// }


var brandsObject = {};
var categoryObject = {};

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

var wishlistProducts = [];

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

async function main() {

    var user = await getUser("6127123537633b50040b9f0f");
    
    console.log('user:', user)

    if (user != null) {
        var userNameDisplay = document.getElementById("userNameDisplay");
        userNameDisplay.innerHTML = `${user.first_name}`;
    }

    for (let i = 0; i < user.wishlist.length; i++) {

        wishlistProducts.push(user.wishlist[i]);

    }

    showProducts(wishlistProducts);
    
}

main();

function showProducts(data) {

    data_div.innerHTML = "";

    data.forEach(function (object) {
        addProductsToBrowser(object);
    });

}

function addProductsToBrowser(object) {

    var div = document.createElement("div");
    div.setAttribute("class", "product");


    let wishlistIcon = document.createElement("div");
    wishlistIcon.innerHTML = `<div class="heartimg"><button onclick="removeFromWishlist('${object.name}','${object.brand}','${object.price}','${object.category}')" class="wishlist-icon-fill" id="whishlistItem"></button></div>`;
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
        addToBag(object);
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

function removeFromWishlist(objName, objBrand, objPrice, objCategory) {
    var newWishlistProducts = [];
    var product = {};
    let i = 0;
    for (i = 0; i < wishlistProducts.length; i++) {
        if (wishlistProducts[i].brand == objBrand && wishlistProducts[i].name == objName && wishlistProducts[i].category == objCategory && wishlistProducts[i].price == objPrice) {
            product = wishlistProducts[i];
        } else {
            newWishlistProducts.push(wishlistProducts[i]);
        }
    }

    updateWishlist(product);
    
    main();
}

async function updateWishlist(productsObj) {

    try {
        
        var res = await fetch("http://localhost:2345/users", {
        
            method: "DELETE",
        
            body: JSON.stringify(productsObj),

            headers: {

                'Content-Type': 'application/json'

            }


        });
    
        var reqData = await res.json();
    
        return reqData;

    }
    catch (err) {

        console.log(err);

    }

}

function addToBag(obj) {

    // console.log(obj);



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