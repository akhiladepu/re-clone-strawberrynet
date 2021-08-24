
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

let div_app = document.getElementById("js")
let div_app2 = document.getElementById("js2")
let div_app3 = document.getElementById("js3")
function appendprod(e) {
    var array = ["1", "2", "3", "4"];
    let image = document.createElement('img')
    image.src = e.image
    image.setAttribute('class', 'img1')
    let brand = document.createElement('h2')
    brand.innerHTML = e.brand
    let name = document.createElement('p')
    name.innerHTML = e.name
    let price = document.createElement('p')
    price.innerHTML = `INR:${e.price}`
    let div = document.createElement('div')
    div.setAttribute('class', 'demo')
    div.append(image)
    let div2 = document.createElement('div')
    div2.setAttribute('class', 'demo2')
    div2.append(brand, name, price)
    let selectlist = document.createElement('select');
    for (i = 0; i < array.length; i++) {
        var option = document.createElement('option')
        option.value = array[i]
        option.text = array[i];
        selectlist.append(option)
    }
    let div3 = document.createElement('div')
    div3.setAttribute('class', 'demo3')
    div3.innerHTML = "Qty"
    div3.append(selectlist)
    let div4 = document.createElement('div')
    div4.setAttribute('class', 'demo4')
    div4.innerHTML = `INR${e.price}`

    
    let hr = document.createElement('hr');

    div_final = document.createElement('div')
    div_final.setAttribute('class', 'div_final')
    div_final.append(div, div2, div3, div4)
    div_app.append(div_final, hr)
}
function showlocation() {
    let data = JSON.parse(localStorage.getItem('bag'))
    div_app.innerHTML = null
    total = data.length
    sum = 0;
    for (i = 0; i < data.length; i++) {
        sum += Number(data[i].price)
    }
    let item = document.createElement('h3')
    item.innerHTML = `Item Total:${total}item(s)`
    let total_p = document.createElement('p')
    total_p.innerHTML = `INR  ${sum}`
    total_p.setAttribute('class', 'total_prices')
    div = document.createElement('div')
    div.append(item, total_p)
    div.setAttribute('class', 'part3-1')
    div2 = document.createElement('div')
    let div_extra = document.createElement('div')
    div_extra.innerHTML = 'Standard Shipping (Signature)'
    div_extra_p = document.createElement('p')
    div_extra_p.innerHTML = `INR  ${773.00}`
    div3 = document.createElement('div')
    div3.append(div_extra, div_extra_p)
    div3.setAttribute('class', 'div3')
    let div_extra1 = document.createElement('div')
    div_extra1.innerHTML = 'Freight Surcharge'
    div_extra_p1 = document.createElement('p')
    div_extra_p1.innerHTML = `INR  ${81.20}`
    div_extra_p1.setAttribute('class', 'inr')
    div4 = document.createElement('div')
    div4.append(div_extra1, div_extra_p1)
    div4.setAttribute('class', 'div4')
    final_repo = document.createElement('h3')
    final_repo.innerHTML = `Order Total:${data.length}item(s)`
    div_final_repo = document.createElement('div')
    div_final_repo.append(final_repo)
    div_final_repo.setAttribute('class', 'final_repo')
    final_repo1 = document.createElement('h3')
    final_repo1.innerHTML = `<span class="span1">INR</span> ${sum + 81.20 + 773}`
    div_final_repo1 = document.createElement('div')
    div_final_repo1.append(final_repo1)
    div_final_repo1.setAttribute('class', 'final_repo1')
    div_app3.append(div_final_repo, div_final_repo1)
    div_app2.append(div, div3, div4)
    data.forEach(function (e) {
        appendprod(e)
    })
}
showlocation();