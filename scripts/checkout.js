var user = JSON.parse(localStorage.getItem("userId"));

const userId = user.id;

window.onload = function() {
        window.setTimeout(
            function() {
                window.scrollTo(0,0);
                document.body.style.display = "inherit";
            },
            0
        );
    };


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
        
        return user.bag;

    } catch (err) {
        
    }

}





let div_app = document.getElementById("js")
let div_app3 = document.getElementById("js3")
let div_p_detail=document.getElementById('item_total_p')
let div_10_discount=document.getElementById('discount_10')
let final_overall=document.getElementById('final_disc')
let code_30=document.getElementById('discCode')
let key=document.getElementById('provide_width1')
let key_value=document.getElementById('discount_promo')
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

        

        
            
        

        let div3 = document.createElement('div')
        div3.setAttribute('class', 'demo3')
        div3.innerHTML = "Qty:1"
        

        let div4 = document.createElement('div')
        div4.setAttribute('class', 'demo4')
        div4.innerHTML = `INR${e.price}`


        div_final = document.createElement('div')
        div_final.setAttribute('class', 'div_final')
        div_final.append(div, div2, div3, div4)


        div_app.append(div_final)

    }
    async function showlocation() {
            let data = await getUser(userId);
             //console.log('data:', data)
        
        
        
            div_app.innerHTML = null
            total = data.length
            sum = 0;
            for (i = 0; i < data.length; i++) {
                sum += Number(data[i].price)
            }



            let item = document.createElement('h3')
            item.innerHTML = `item Total:${total}item(s)`

            let total_p = document.createElement('h2')
            total_p.innerHTML = `INR  ${sum}`
            total_p.setAttribute('class', 'total_prices')
            div = document.createElement('div')
            div.append(item, total_p)

            div_p_detail.innerHTML=`<span class="currsymbol">INR</span>${sum}`
            div_10_discount.innerHTML=`<span class="currsymbol">INR</span>${Math.floor((sum/100)*10)}`
            div_10 = (sum / 100) * 10;
            final_overall.innerHTML=`<span class="currsymbol">INR</span>${Math.floor((sum+773+81.20)-div_10)}`
            
            final_repo = document.createElement('h3')
        final_repo.innerHTML = `Item Total(${data.length})`

        div_final_repo = document.createElement('div')
        div_final_repo.append(final_repo)
        div_final_repo.setAttribute('class', 'final_repo')


        final_repo1 = document.createElement('h1')
        final_repo1.innerHTML = `<span class="currsymbol">INR</span> ${sum}.00`
        final_repo1.setAttribute('class', 'total_write')


        div_final_repo1 = document.createElement('div')
        div_final_repo1.append(final_repo1)
        div_final_repo1.setAttribute('class', 'final_repo1')


        div_app3.append(div_final_repo, div_final_repo1)

            data.forEach(function (e) {
                appendprod(e)
            })
        }

        showlocation();
        async function getCheckoutContent(){
            console.log("bwshyqw")
             let data = await getUser(userId);
            
                sum = 0;
            for (i = 0; i < data.length; i++) {
                sum += Number(data[i].price)
            }
            if(code_30.value=="masaischool"){
                alert('Promo Code Applied');
                var sam = "color:red";
                sum= (sum + 773 + 81.20)-Math.floor(((sum / 100) * 10))-Math.floor(((sum / 100) * 30));
                key.innerHTML = "Discount Applied";
                key.setAttribute("style", "sam")
                var sample = Math.round((sum / 100) * 30);
                key_value.innerHTML= `<span class="currsymbol">INR</span>${sample}.00`
            }else{
                alert('Invalid Code !')
                sum=sum;
            }
                final_overall.innerHTML=sum;



        }
        function saveAddr(){
            //window.location.href = 'payment.html'
            
            
            let first = document.getElementById('sfirstname').value.trim()
            let last = document.getElementById('slastname').value.trim()
            let address = document.getElementById('saddress1').value.trim()
            let address1 = document.getElementById('saddress2').value.trim()
            let city = document.getElementById('scity').value.trim()
            let pincode=document.getElementById('spostcode').value.trim()
            let state = document.getElementById('sstate').value.trim()
            let mobile = document.getElementById('smobile').value.trim()
            //console.log(first, last, address, address1, city, state, mobile);
            if (first === "" || last === "" ||
                address === "" ||
                city === "" ||
                state === "" ||
                pincode.length !== 6 ||
                mobile.length !== 10) {
                alert("Check your Shipment Details !");
                //window.location.href = "checkout.html"
            } else {
                let data1 = {
                    first,
                    last,
                    address,
                    address1,
                    city,
                    state,
                    pincode,
                    mobile
                }
                let arr;
                arr = localStorage.getItem('address')
                if (arr == null) {
                    arr = []
                }
                else {
                    arr = JSON.parse(localStorage.getItem('address'))
                
                }
                arr.push(data1);
                localStorage.setItem('address', JSON.stringify(arr))

                let ship = document.getElementById('ship')
                ship.style.display = 'none'


                let div_f = document.getElementById('fixed');

                h1 = document.createElement("h1")
                h1.innerHTML = 'Shipping Address'
                item = JSON.parse(localStorage.getItem('address'))
                h4 = document.createElement("h4")
                h4.innerHTML = `${item[item.length - 1].first} ${item[item.length - 1].last}`
                p = document.createElement("p")
                p.innerHTML = `${item[item.length - 1].address},${item[item.length - 1].address1}`

                cross = document.createElement('Button')
                cross.innerHTML = "X"
                cross.setAttribute('class', 'cross1')
                cross.addEventListener("click", function () {
                    edit();
                });


            

            

            
        
                city = document.createElement("p")
                city.innerHTML = `${item[item.length - 1].city}   ${item[item.length - 1].pincode}`
                state = document.createElement("p")
                state.innerHTML = item[item.length - 1].state
            
                Mobile = document.createElement("p")
                Mobile.innerHTML = item[item.length - 1].mobile
                btn = document.createElement('Button')
                btn.innerHTML = 'Proceed'
                btn.setAttribute('class', 'proceed')
                btn.addEventListener("click", function () {
                
                    paypage();

                });

                div_f.append(cross, h1, h4, p, city, state, Mobile, btn)
                console.log(item[item.length - 1].city);

            }
}
function paypage() {
    window.location.href = 'payment.html'
}
function edit() {
    
    self.location.reload();
}
        