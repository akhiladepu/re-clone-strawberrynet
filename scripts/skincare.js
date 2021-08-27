var user = JSON.parse(localStorage.getItem("userId"));
if (user != null) {
    var userNameDisplay = document.getElementById("userNameDisplay");
    userNameDisplay.innerHTML = `${user.name}`;
}

var products;
var bagged;

let connect = async () => {
    try {
        res = await fetch('http://localhost:2345/products');
        products = await res.json();
        showProducts(products);
    }
    catch(err) {
        console.log(err.message);
    }
}
connect();
let getBag = async () => {
    try {
        const res = await fetch('http://localhost:2345/users');
        const data = await res.json();
        data.forEach((el) => {
            if (el._id === user.id) {
                bagged = el.bag;
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
getBag();


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

var i = 0;
var numProd = 0;
var singleProduct;

var body = document.getElementById('productContainer');

var singleContainer = document.getElementById('single-container');

function showProducts(p) {
    numProd = 0;
    singleContainer.innerHTML = null;
    p.forEach(function (el) {
        if (el.category == "Skincare")
            appendProduct(el);
    });
}

function appendProduct(el) {
    numProd++;
    let frame = document.createElement('div');
    frame.setAttribute('class', 'frame');

    let brand_name = document.createElement('div');
    brand_name.setAttribute('class', 'brand-name');

    let b_n = document.createElement('div');

    let brand = document.createElement('p');
    brand.textContent = el.brand;

    let name = document.createElement('p');
    name.innerText = el.name;
    b_n.addEventListener('click', function () {
        leadToProductPage(el);
    })
    b_n.append(brand, name);

    brand_name.append(b_n);

    let image_button = document.createElement('div');
    image_button.setAttribute('class', 'image-button');
    let image_f = document.createElement('img');
    image_f.src = el.image;

    let click = document.createElement('p');
    click.textContent = "click>>>"

    image_button.append(image_f, click);

    if (el.deal == 'Best') {
        let btn = document.createElement('button');
        btn.textContent = "Best Deals";
        frame.append(btn);
        image_button.append(image_f, click, btn);
    }
    else if (el.deal == "Low") {
        let btn = document.createElement('button');
        btn.textContent = "Low Price Picks";
        frame.append(btn);
        image_button.append(image_f, click, btn);
    }
    let discountContainer = document.createElement('div');
    discountContainer.setAttribute('class', 'discount-container');
    if (el.discount != 0 && el.discount != "None") {
        let actual_price = document.createElement('p');
        actual_price.innerHTML = `RRP <s>Rs. ${Math.floor(Number(el.price) * (100 + el.discount) / 100)}</s>`;
        let discount_circle = document.createElement('div');
        discount_circle.setAttribute('class', 'discount');
        discount_circle.textContent = `SAVE ${el.discount}%`;
        discountContainer.append(actual_price, discount_circle)
    }

    let priceContainer = document.createElement('div');
    priceContainer.setAttribute('class', 'price-container');
    let price = document.createElement('p');
    price.setAttribute('class', 'price');

    let price_comma = String(el.price).split("");
    if (price_comma.length > 6) {
        price_comma = price_comma[0] + "," + price_comma[1] + price_comma[2] + price_comma[3] + price_comma[4] + price_comma[5] + price_comma[6];
    }
    else {
        price_comma = el.price;
    }
    price.innerText = `Rs. ${price_comma}`;

    let off = document.createElement('p');
    off.setAttribute('class', 'off');
    off.textContent = "Extra 8% Off"

    priceContainer.append(price, off);

    let buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');
    let btn_add = document.createElement('button');
    btn_add.textContent = "ADD TO BAG";
    btn_add.addEventListener('click', function () {
        addToBAg(el);
    })
    buttonContainer.append(btn_add);

    frame.append(brand_name, image_button, discountContainer, priceContainer, buttonContainer);
    singleContainer.append(frame);
}

function lowestPrice() {
    let prod = products.sort(function (a, b) {
        if (a.category == 'Skincare')
            return a.price - b.price;
    });
    showProducts(prod);
}

function biggestDiscount() {
    let prod = products.sort(function (a, b) {
        if (a.category == 'Skincare' && a.discount != '0' && a.discount != 'None')
            return b.discount - a.discount;
    });
    showProducts(prod);
}

function brandAZ() {
        if (a.category == 'Skincare') {
            let A = a.brand.toLowerCase();
            let B = b.brand.toLowerCase();
            if (A < B) {
                return -1;
            }
            else if (A > B) {
                return 1;
            }
            return 0;
        }
    showProducts(prod);
}

function nameAZ() {
    let prod = products.sort(function (a, b) {
        if (a.category == 'Skincare') {
            let A = a.name.toLowerCase();
            let B = b.name.toLowerCase();
            if (A < B) {
                return -1;
            }
            else if (A > B) {
                return 1;
            }
            return 0;
        }
    });
    showProducts(prod);
}

// showProducts(products);

function filterLine(n) {
    let clarins = document.getElementById('Clarins');
    let eltamd = document.getElementById('EltaMD');
    let elizabethArden = document.getElementById('Elizabeth Arden');
    let filorga = document.getElementById('Filorga');
    let clinique = document.getElementById('Clinique');
    let timelessSkinCare = document.getElementById('Timeless Skin Care');
    let marvis = document.getElementById('Marvis');
    let dermadoctor = document.getElementById('DERMAdoctor');
    let laRocheyPosay = document.getElementById('La Rochey Posay');
    let prod = [];
    let i = 0;
    if (clarins.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "Clarins") {
                prod.push(products[i]);
            }
        }
    }
    if (eltamd.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "EltaMD") {
                prod.push(products[i]);
            }
        }
    }
    if (elizabethArden.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "Elizabeth Arden") {
                prod.push(products[i]);
            }
        }
    }
    if (clinique.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "Clinique") {
                prod.push(products[i]);
            }
        }
    }
    if (timelessSkinCare.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "Timeless Skin Care") {
                prod.push(products[i]);
            }
        }
    }

    if (filorga.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "Filorga") {
                prod.push(products[i]);
            }
        }
    }
    if (marvis.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "Marvis") {
                prod.push(products[i]);
            }
        }
    }
    if (dermadoctor.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "DERMAdoctor") {
                prod.push(products[i]);
            }
        }
    }
    if (laRocheyPosay.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].brand == "La Rochey Posay") {
                prod.push(products[i]);
            }
        }
    }

    if (clarins.checked == false && eltamd.checked == false && elizabethArden.checked == false && clinique.checked == false && timelessSkinCare.checked == false && filorga.checked == false && marvis.checked == false && dermadoctor.checked == false && laRocheyPosay.checked == false) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare') {
                prod.push(products[i]);
            }
        }
    }
    showProducts(prod);
}

function filterDeals() {
    let low = document.getElementById('Low');
    let best = document.getElementById('Best');
    let prod = [];
    let i = 0;
    if (low.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].deal == "Low") {
                prod.push(products[i]);
            }
        }
    }

    if (best.checked == true) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare' && products[i].deal == "Best") {
                prod.push(products[i]);
            }
        }
    }

    if (low.checked == false && best.checked == false) {
        for (i = 0; i < products.length; i++) {
            if (products[i].category == 'Skincare') {
                prod.push(products[i]);
            }
        }
    }
    showProducts(prod);
}

const addToBAg = async (e) => {
    for (let i = 0; i < bagged.length; i++) {
        if (bagged[i]._id == e._id) {
            alert("Product Already In the Bag");
            return false;
        }
    }
    bagged.push(e);
    let data = {
    _id: user.id,
    bag: bagged
    }
    try {
        await fetch('http://localhost:2345/users/bag', {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

function leadToProductPage(e) {
    singleProduct = e;
    localStorage.setItem('singleProduct', JSON.stringify(singleProduct));
    window.location.href = "productDetails.html";
}

