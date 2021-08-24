
var user = JSON.parse(localStorage.getItem("users"));
if (user != null) {
    var userNameDisplay = document.getElementById("userNameDisplay");
    userNameDisplay.innerHTML = `${user[0].fName}`;
}
window.onscroll = function () { myFunction() };

var navbar = document.getElementById("sample");
console.log(navbar);
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }

 function slideshow() {

    const arr = ['https://a.cdnsbn.com/images/English/banner_RewardProgramBP_1140_1.jpg',
        "https://a.cdnsbn.com/images/English/banner_BeautyBreakSale8offJul21_1170_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_Jul21SpecialPurchase_1170_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_SkincareAntiPollutionJul21_1170_1.jpg?v=3",
        "https://a.cdnsbn.com/images/English/banner_MakeupEyeMakeupJul21_1170_1.jpg?v=3",
        "https://a.cdnsbn.com/images/English/banner_MedicalMask28Sep20_1140_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_VeganBeautyNov20_1170_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_AshiyaMay21_1170_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_WeekendDeals02Jul21_1170_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_Jul21top40_1170_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_Jul21NewLines_1170_1.jpg",
        "https://a.cdnsbn.com/images/English/banner_BrandTacticalDemonFeb20_1140_1.jpg"
    ];

    let div = document.getElementById('slideshow');
    let img = document.createElement('img');
    let i = 0;

    img.src = arr[0];

    div.append(img);

    setInterval(function () {

        img.src = arr[i]

        i++;

        if (i == arr.length) {
            i = 0;
        }
        

    }, 2000)

}
slideshow();

