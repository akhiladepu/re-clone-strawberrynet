let divContainer = document.createElement('div');
divContainer.setAttribute('id', 'divContainer');
let list = document.getElementById('searchBox');

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

var user = JSON.parse(localStorage.getItem("userId"));

if (user == null) {
    productDisplay();
}

var userId = user.id;


async function updateUser(newProductsArray, userId, str) {

    let data;

    if (str == "wishlist") {
        data = {
            _id: userId,
            wishlist: newProductsArray
        }
    } else if (str == "bag") {
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

var products;
var wishlistProducts;
var bagProducts;

async function getUser(id) {

    try {

        var res = await fetch("http://localhost:2345/users");

        var reqData = await res.json();

        let user = [];

        for (let i = 0; i < reqData.length; i++) {
            if (reqData[i]._id == id) {
                user = reqData[i];
                break;
            }
        }

        return user;

    } catch (err) {

    }

}

async function getProducts() {

    try {

        var res = await fetch("http://localhost:2345/products");

        var reqData = await res.json();

        return reqData;

    }
    catch (err) {

        console.log(err);

    }

}

async function main(userId) {

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

    // slideshow();

    products = await getProducts();

    var daily_specials = [];
    var best_Prods = [];
    var top_specials = [];
    var best_seller = [];
    var arrivals = [];
    var top_liked = [];

    for (let i = 0; i < products.length; i++) {
        if (products[i].deal == "dailySpecials") {
            daily_specials.push(products[i]);
        } else if (products[i].deal == "bestDeals") {
            best_Prods.push(products[i]);
        } else if (products[i].deal == "top40Specials") {
            top_specials.push(products[i]);
        } else if (products[i].deal == "bestSeller") {
            best_seller.push(products[i]);
        } else if (products[i].deal == "newArrivals") {
            arrivals.push(products[i]);
        } else if (products[i].deal == "youMayLikeThese") {
            top_liked.push(products[i]);
        }
    }



    function showProducts(data, element, userId) {

        var data_div = document.getElementById(`${element}`);
        data_div.innerHTML = "";

        data.forEach(function (object) {
            addProductsToBrowser(object, data_div, userId);
        });
    }

    showProducts(daily_specials, "daily_special_products", userId);
    showProducts(best_Prods, "best_product_deals", userId);
    showProducts(top_specials, "top_40_specials", userId);
    showProducts(best_seller, "best_sell", userId);
    showProducts(arrivals, "new_arrivals", userId);
    showProducts(top_liked, "you_may_like_these", userId);



    function addProductsToBrowser(object, data_div, userId) {

        let div = document.createElement("div");
        div.setAttribute("class", "productBox");

        let div_one = document.createElement("div");
        div_one.setAttribute("id", "wishlisted");
        div_one.innerHTML = `<div class="heartimg"><button onclick="addToWishlist('${object.name}','${object.brand}','${object.price}','${object.category}', '${userId}', 'wishlisted')" class="wishlist-icon-fill" id="whishlistItem"></button></div>`;

        div_one.addEventListener("click", function () {
            div_one.innerHTML = null;
            div_one.innerHTML = `<div class="heartimg1"><button onclick=""></button></div>`;
        })
        let pro_image = document.createElement("img");
        pro_image.src = object.image;


        let pro_name = document.createElement("div");
        pro_name.setAttribute("id", "pro_name");
        pro_name.innerHTML = `<div>${object.brand}</div>`
        let brk = document.createElement('br');
        brk.innerHTML = `<br></br>`;

        let prod_description = document.createElement("div");
        prod_description.setAttribute("id", "prod_description");
        prod_description.innerHTML = `<div>${object.name}</div>`;


        let pro_discount = document.createElement("div");
        pro_discount.setAttribute("id", "save");
        pro_discount.innerHTML = `<div>SAVE ${object.discount}%</div>`;

        let pro_rupees = document.createElement("div");
        pro_rupees.setAttribute("id", "rupees");
        pro_rupees.innerHTML = `<div>Rs. ${object.price}</div>`;

        let pro_original_rupees = document.createElement('div');
        pro_original_rupees.setAttribute("id", "strike");
        var sample = Number(object.price) + Number(object.price * object.discount);
        pro_original_rupees.innerHTML = `<div>RRP <del>${sample}.00</del></div>`;

        // let add_bag_button = document.createElement('div');
        // add_bag_button.innerHTML = `<div id="addbag" onclick = "addToCart('${object}', ${userId})">
        //                             <div id="innertxt">Add to bag</div>
        //                             </div>`;

        let add_bag_button = document.createElement("button");
        add_bag_button.setAttribute("class", "productButton");
        add_bag_button.textContent = "Add to bag";
        add_bag_button.addEventListener("click", function () {
            addToCart(object, userId);
        });

        let review_stars = document.createElement("div");
        review_stars.innerHTML = `<div><ul class="rate-area" >
                                    <input type="radio" id="5-star" name="rating" value="1" /><label for="5-star" title="Amazing"></label>
                                    <input type="radio" id="4-star" name="rating" value="2" /><label for="4-star" title="Good"></label>
                                    <input type="radio" id="3-star" name="rating" value="3" /><label for="3-star" title="Average"></label>
                                    <input type="radio" id="2-star" name="rating" value="4" /><label for="2-star" title="Not Good"></label>
                                    <input type="radio" id="1-star" name="rating" value="5" /><label for="1-star" title="Bad"></label>
                                    </ul>
                                    </div>`;

        let extra_discount = document.createElement('div');
        extra_discount.innerHTML = '<div id="extra" style="float: left;margin-top: 0%;">Extra 8% Off</div>';


        div.append(div_one, pro_image, pro_name, brk, prod_description, brk, brk, brk, pro_discount, brk,
            pro_rupees, pro_original_rupees, add_bag_button, review_stars, extra_discount);

        data_div.append(div);

    }

}

async function addToCart(obj, userId) {

    // console.log(obj);

    bagProducts.push(obj);

    await updateUser(bagProducts, userId, "bag");

}

async function addToWishlist(name, brand, price, category, userId, str) {
    let div = document.getElementById("wishlisted");
    div.innerHTML = null;
    div.innerHTML = `<div class="heartimg1"><button onclick=""></button></div>`;

    var obj;

    for (let i = 0; i < products.length; i++) {
        if (products[i].name == name && products[i].brand == brand && products[i].price == price && products[i].category == category) {
            obj = products[i];
            break;
        }
    }


    wishlistProducts.push(obj);

    // console.log('bagProducts:', bagProducts);

    await updateUser(wishlistProducts, userId, "wishlist");

}


main(userId);
function productDisplay() {
    var products;

    async function getProducts() {

        try {

            var res = await fetch("http://localhost:2345/products");

            var reqData = await res.json();

            return reqData;

        }
        catch (err) {

            console.log(err);

        }

    }

    async function sample() {

        products = await getProducts();


        var daily_specials = [];
        var best_Prods = [];
        var top_specials = [];
        var best_seller = [];
        var arrivals = [];
        var top_liked = [];

        for (let i = 0; i < products.length; i++) {
            if (products[i].deal == "dailySpecials") {
                daily_specials.push(products[i]);
            } else if (products[i].deal == "bestDeals") {
                best_Prods.push(products[i]);
            } else if (products[i].deal == "top40Specials") {
                top_specials.push(products[i]);
            } else if (products[i].deal == "bestSeller") {
                best_seller.push(products[i]);
            } else if (products[i].deal == "newArrivals") {
                arrivals.push(products[i]);
            } else if (products[i].deal == "youMayLikeThese") {
                top_liked.push(products[i]);
            }
        }



        function showProducts(data, element, userId) {

            var data_div = document.getElementById(`${element}`);
            data_div.innerHTML = "";

            data.forEach(function (object) {
                addProductsToBrowser(object, data_div, userId);
            });
        }

        showProducts(daily_specials, "daily_special_products", userId);
        showProducts(best_Prods, "best_product_deals", userId);
        showProducts(top_specials, "top_40_specials", userId);
        showProducts(best_seller, "best_sell", userId);
        showProducts(arrivals, "new_arrivals", userId);
        showProducts(top_liked, "you_may_like_these", userId);



        function addProductsToBrowser(object, data_div, userId) {

            let div = document.createElement("div");
            div.setAttribute("class", "productBox");

            let div_one = document.createElement("div");
            div_one.setAttribute("id", "wishlisted");
            div_one.innerHTML = `<div class="heartimg"><button onclick="addToWishlist('${object.name}','${object.brand}','${object.price}','${object.category}', '${userId}', 'wishlisted')" class="wishlist-icon-fill" id="whishlistItem"></button></div>`;

            div_one.addEventListener("click", function () {
                div_one.innerHTML = null;
                div_one.innerHTML = `<div class="heartimg1"><button onclick=""></button></div>`;
            })
            let pro_image = document.createElement("img");
            pro_image.src = object.image;


            let pro_name = document.createElement("div");
            pro_name.setAttribute("id", "pro_name");
            pro_name.innerHTML = `<div>${object.brand}</div>`
            let brk = document.createElement('br');
            brk.innerHTML = `<br></br>`;

            let prod_description = document.createElement("div");
            prod_description.setAttribute("id", "prod_description");
            prod_description.innerHTML = `<div>${object.name}</div>`;


            let pro_discount = document.createElement("div");
            pro_discount.setAttribute("id", "save");
            pro_discount.innerHTML = `<div>SAVE ${object.discount}%</div>`;

            let pro_rupees = document.createElement("div");
            pro_rupees.setAttribute("id", "rupees");
            pro_rupees.innerHTML = `<div>Rs. ${object.price}</div>`;

            let pro_original_rupees = document.createElement('div');
            pro_original_rupees.setAttribute("id", "strike");
            var sample = Number(object.price) + Number(object.price * object.discount);
            pro_original_rupees.innerHTML = `<div>RRP <del>${sample}.00</del></div>`;

            // let add_bag_button = document.createElement('div');
            // add_bag_button.innerHTML = `<div id="addbag" onclick = "addToCart('${object}', ${userId})">
            //                             <div id="innertxt">Add to bag</div>
            //                             </div>`;

            let add_bag_button = document.createElement("button");
            add_bag_button.setAttribute("class", "productButton");
            add_bag_button.textContent = "Add to bag";
            add_bag_button.addEventListener("click", function () {
                addToCart(object, userId);
            });

            let review_stars = document.createElement("div");
            review_stars.innerHTML = `<div><ul class="rate-area" >
                                    <input type="radio" id="5-star" name="rating" value="1" /><label for="5-star" title="Amazing"></label>
                                    <input type="radio" id="4-star" name="rating" value="2" /><label for="4-star" title="Good"></label>
                                    <input type="radio" id="3-star" name="rating" value="3" /><label for="3-star" title="Average"></label>
                                    <input type="radio" id="2-star" name="rating" value="4" /><label for="2-star" title="Not Good"></label>
                                    <input type="radio" id="1-star" name="rating" value="5" /><label for="1-star" title="Bad"></label>
                                    </ul>
                                    </div>`;

            let extra_discount = document.createElement('div');
            extra_discount.innerHTML = '<div id="extra" style="float: left;margin-top: 0%;">Extra 8% Off</div>';


            div.append(div_one, pro_image, pro_name, brk, prod_description, brk, brk, brk, pro_discount, brk,
                pro_rupees, pro_original_rupees, add_bag_button, review_stars, extra_discount);

            data_div.append(div);

        }


    }

    sample();
}

function throttle() {
    search();
}

async function search() {
    let data = await getProducts();
    divContainer.innerHTML = null;
    let query = document.getElementById('search').value;
    if (query.length == 0)
        return;
    let len = query.length;
    let ans = [];
    data.forEach((el) => {
        if (el.brand.slice(0, len).toLowerCase() == query.toLowerCase())
            ans.push(el);
    })
    let fil = {};
    for (let i = 0; i < ans.length; i++) {
        if (fil[ans.brand] == undefined)
            fil[ans[i].brand] = true
    }
    Object.keys(fil).forEach((el) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'dropItem');
        div.innerHTML = el;
        div.addEventListener('click', () => {
            window.location.href = `/pages/skincare.html?brand=${el}`
        })
        divContainer.append(div);
    })
    list.append(divContainer);
}