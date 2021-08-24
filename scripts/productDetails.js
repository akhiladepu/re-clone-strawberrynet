
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


var product = JSON.parse(localStorage.getItem('singleProduct'));
var productContainer = document.getElementById('productContianer');
var leftContainer = document.getElementById('leftContainer');
var upContainer = document.getElementById('upContainer');

function showProduct(el) {
    let discount_circle = document.createElement('div');
        discount_circle.setAttribute('class', 'discount');
    if (el.discount != 0 && el.discount != "None") {
        discount_circle.textContent = `SAVE ${el.discount}%`;
        leftContainer.append(discount_circle);
    }
    let imageContainer = document.createElement('a');
    let image_f = document.createElement('img');
    image_f.src = el.image;

    imageContainer.append(image_f)

    let small_image1 = document.createElement('div');
    small_image1.setAttribute('class', 'smallImage');
    let s_image_1 = document.createElement('img');
    s_image_1.src = el.image;
    small_image1.append(s_image_1);

    let small_image2 = document.createElement('div');
    small_image2.setAttribute('class', 'smallImage');
    let s_image_2 = document.createElement('img');
    s_image_2.src = el.image;
    small_image2.append(s_image_2);

    let small_image3 = document.createElement('div');
    small_image3.setAttribute('class', 'smallImage');
    let s_image_3 = document.createElement('img');
    s_image_3.src = el.image;
    small_image3.append(s_image_3);

    let smallImageContainer = document.createElement('div');
    smallImageContainer.setAttribute('id', 'smallImageContainer');

    smallImageContainer.append(small_image1,small_image2,small_image3)

    leftContainer.append(imageContainer, smallImageContainer);
    
    let brand = document.createElement('a');
    brand.setAttribute('id', 'brand');
    brand.textContent = el.brand;

    let point = cutting(el.name);
    let nameCont = el.name.slice(0, point);
    let sizeCont = el.name.slice(point);
    let name = document.createElement('h1');
    name.setAttribute('id', 'name');
    name.textContent = nameCont;

    let size = document.createElement('div');
    size.setAttribute('id', 'size');
    size.textContent = `Size:${sizeCont}`;

    let sizeContainer = document.createElement('div');
    sizeContainer.setAttribute('id', 'sizeContainer');
    let sale = document.createElement('div');
    sale.textContent = "SALE!";
    sale.setAttribute('id', 'sale');
    let sizeBox = document.createElement('div');
    sizeBox.setAttribute('id', 'sizeBox');
    sizeBox.innerHTML = `${sizeCont}`;
    sizeContainer.append(sale, sizeBox);

    let price = document.createElement('p');
    price.setAttribute('id', 'price');
    let pnum = el.price.slice(0,el.price.length - 3);
    let decimal = el.price.slice(-3);
    if (pnum.length > 3) {
        pnum = pnum[0] + "," + pnum[1] + pnum[2] + pnum[3];
    }
    price.innerHTML = `<sup>Rs.</sup>${pnum}<sup>${decimal}</sup>`

    let btn_add = document.createElement('button');
    btn_add.setAttribute('id', 'button-container');
    btn_add.textContent = "Add to bag";
    btn_add.addEventListener('click', function () {
        addToBAg(el);
    })
    
   
    upContainer.append(brand,name,size,sizeContainer,price);
    if (el.discount != 0 && el.discount != "None") {
        let save = document.createElement('p');
        save.setAttribute('id', 'save');
        save.textContent = `Save: ${el.discount}%`;
        upContainer.append(save);
    }
    upContainer.append(btn_add);
}

showProduct(product);

function cutting(str) {
    let k;
    for (let i = str.length; i >= 0; i--) {
        if ((str[i] >= '0' && str[i] <= '9') && str[i - 1] == " ") {
            return i;
        }
    }
}
function addToBAg(e) {
    console.log(e);
    
    let bag;
   
    if (localStorage.getItem('bag') == null) {
        bag = [];
    }
    else {
        bag = JSON.parse(localStorage.getItem('bag'));
    }
        
    bag.push(e);
    
    localStorage.setItem('bag', JSON.stringify(bag));
}

let wishlist = document.getElementById('wishlist');
wishlist.addEventListener('click', function () {
    addToWishList(product);
});
var wish;
function addToWishList(e) {
    if (localStorage.getItem('wishlist') == null) {
        wish = [];
    }
    else {
        wish = JSON.parse(localStorage.getItem('wishlist'));
    }
    wish.push(e);
    localStorage.setItem('wishlist', JSON.stringify(wish));
}

 function themePromoContentToggle() {
        div_li = document.getElementById('discription')
        div_li.innerHTML = null
        div_c = document.getElementById('extraL')
        div_c.style["margin-left"] = "160px";
        div = document.createElement('div')
        div.innerHTML = '<ul><li>BE THE FIRST TO REVIEW THIS PRODUCT!UNDEFINED</li></ul>'
        div_li.append(div)
    }
    function Toggle1() {
        div_li = document.getElementById('discription')
        div_c = document.getElementById('extraL')
        div_c.style["margin-left"] = "0px";
        div_li.innerHTML = null
        div = document.createElement('div')
        div.innerHTML = '<ul><li class="prodDetail2"> An instant moisture - boosting facial mask</li><li class="prodDetail2"> Formulated with new Glacier Water, Hyaluronic Acid &amp; Apricot</li><li class="prodDetail2"> Instantly boosts moisture levels in just ten minutes</li><li class="prodDetail2"> Quenches thirsty skin &amp; delivers superfood-infused hydration to extra dry spots</li><li class="prodDetail2">Leaves skin soft, smooth, comfortable, conditioned &amp; healthy-looking</li><li class="prodDetail2">100% vegetarian &amp; vegan</li><li class="prodDetail2">Free of gluten, parabens, phthalates, sodium lauryl sulfate, propylene glycol, mineral oil, DEA, petrolatum,paraffin, polyethylene beads, formaldehyde &amp; animal ingredients</li></ul>'
        div_li.append(div)
    }