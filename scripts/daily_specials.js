async function getData() {

    try {
            
        var res = await fetch("http://localhost:2345/products", {
            method: "POST",
            body: JSON.stringy(data),
            headers: {'Content-type':'application/json'}
        });
        
        var reqData = await res.json();
        
        return reqData;

    }
    catch (err) {

        console.log(err);

    }

}

async function main() {

    var daily_specials = await getData();
    
    var data_div = document.getElementById("daily_special_products");

    function showProducts(data) {

        var data_div = document.getElementById("daily_special_products");
        data_div.innerHTML = "";

        data.forEach(function (object) {
            addProductsToBrowser(object);
        });
    }

    showProducts(daily_specials);

    function addProductsToBrowser(object) {
        let div = document.createElement("div");
        div.setAttribute("class", "productBox");

        let div_one = document.createElement('div');
        div_one.innerHTML = ` <div><i class="fa fa-heart-o fa-2x" style="font-size:24px; float: right; margin-right: 20px; margin-top: 10px; color:#623381;"></i></div>`;

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

        let add_bag_button = document.createElement('div');
        add_bag_button.innerHTML = `<div id="addbag" onclick = "addToCart('${object.name}','${object.brand}','${object.price}','${object.category}','${object.discount}')">
<div id="innertxt">Add to bag</div>
</div>`;

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
    var bag = [];
    var products = JSON.parse(localStorage.getItem('products'));
    function addToCart(name, brand, price, category, discount) {
        var temp;
        for (var i = 0; i < products.length; i++) {
            if (products[i].name == name && products[i].brand == brand && products[i].price == price && products[i].category == category && products[i].discount == discount) {
                temp = products[i];
            }
        }
        var bag = JSON.parse(localStorage.getItem("bag"));
        if (bag == null) {
            bag = [];
        } else {
            bag = JSON.parse(localStorage.getItem("bag"));
        }

        bag.push(temp);

        localStorage.setItem("bag", JSON.stringify(bag));
    }
}

main();