var user = JSON.parse(localStorage.getItem("userId"));

const userId = user.id;

var bagProducts;
var sampleNumber = 1;
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
        
    if (user != null) {
        var userNameDisplay = document.getElementById("userNameDisplay");
        userNameDisplay.innerHTML = `${user.first_name}`;
    }
    
        bagProducts = user.bag;
        
        if (sampleNumber == 1) {
            if (bagProducts == undefined || bagProducts.length == 0 || bagProducts == null) {
                let div = document.getElementById("contain_bag");
                div.innerHTML = "";

                let bagCount = document.createElement("div");
                bagCount.setAttribute("id", "bagCount")
                bagCount.textContent = "0";

                div.append(bagCount);
            } else {
                let div = document.getElementById("contain_bag");

                let bagCount = document.createElement("div");
                bagCount.setAttribute("id", "bagCount")
                bagCount.textContent = bagProducts.length;

                div.append(bagCount);
                sampleNumber++;
            }
        }

        
        return user.bag;

    } catch (err) {
        
    }

}
async function upDateName(id) {
    
    try {
            
        var res = await fetch(`http://localhost:2345/users/${id}`);
        
        var reqData = await res.json();
        let div = document.getElementById('checkoutAs')
        p=document.createElement('p')
        p.innerHTML = `Checkout as ${reqData.first_name}`
        div.append(p);

        let div1 = document.getElementById('not?')
        p1=document.createElement('p')
        p1.innerHTML = `Not ${reqData.first_name}?`
        div1.append(p1);
        


        
        

    } catch (err) {
        
    }

}
upDateName(userId)
//...............................................remove...................................
async function removefrmcart(object, userId) {
   
    var data = await getUser(userId)
    for (i = 0; i < data.length; i++) {
        if (data[i]._id == object._id) {
            data.splice(i,1)

        }
        

      
    }sampleNumber = 1
    await updateUser(data, userId, "bag");

    
    


    
}
async function updateUser(newProductsArray, userId, str) {

    var data;
    
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

           
            cache: 'default',
            credentials:'same-origin',
        
            method: "PATCH",
        
            body: JSON.stringify(data),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
           


        });
        
        
        showlocation(userId);

    }
    catch (err) {

        console.log(err);
        console.log("error piyush nhi ho paya")

    }

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
async function appendprod(e,userId) {
    var data = await getUser(userId);
    
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
    //var option = document.createElement('option')
    //var option = document.createElement('option')
    for (i = 1; i < 6; i++) {
        var option = document.createElement('option')
        
        option.value = i
        option.innerHTML = i
        selectlist.append(option)
    }
    selectlist.addEventListener('change', async () => {
        var p = Number(selectlist.options[selectlist.selectedIndex].text);
        div4.innerHTML = `INR${p * (e.price)}`
        let data = await getUser(userId);

        sum = 0;
    for (i = 0; i < data.length; i++) {
         sum += Number(data[i].price)
         }
        
        total_p.innerHTML = `INR  ${sum + (p * (e.price)) - (e.price)}`;
        total = data.length
        item.innerHTML = `Item Total:${(total + p) - 1}item(s)`
        final_repo.innerHTML = `Order Total:${(total + p) - 1}item(s)`
        final_repo1.innerHTML = `<span class="span1">INR</span> ${(sum + (p * (e.price)) - (e.price)) + 81.20 + 773}`
    })
    


    let div3 = document.createElement('div')
    div3.setAttribute('class', 'demo3')
    div3.innerHTML = "Qty"
    div3.append(selectlist)
    let div4 = document.createElement('div')
    div4.setAttribute('class', 'demo4')
    div4.innerHTML = `INR${e.price}`
    del = document.createElement('button')
    del.innerHTML = "x"
    del.setAttribute('class', 'del')
    del.addEventListener('click', () => {
        
        removefrmcart(e,userId)
    })
    
    let hr = document.createElement('hr');

    div_final = document.createElement('div')
    div_final.setAttribute('class', 'div_final')
    div_final.append(div, div2, div3, div4,del)
    div_app.append(div_final, hr)
   
}

async function showlocation(userId) {
     
    let data = await getUser(userId);
    // console.log('data:', data)
    div_app.innerHTML = null
    div_app2.innerHTML = null
    div_app3.innerHTML=null
    total = data.length
    sum = 0;
    for (i = 0; i < data.length; i++) {
        sum += Number(data[i].price)
    }
    item = document.createElement('h3')
    item.innerHTML = `Item Total: ${total} Item(s)`
     total_p = document.createElement('p')
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
    final_repo.innerHTML = `Order Total: ${data.length} Item(s)`
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
        appendprod(e,userId)
    })
    
}

 
showlocation(userId);