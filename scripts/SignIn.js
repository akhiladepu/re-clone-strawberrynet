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

var users;
var userData;

    const connect = async () => {
        try {
            res = await fetch('http://localhost:2345/users');
            users = await res.json();
            console.log(users);
        }
        catch (err) {
            console.log(err);
        }
    }
    connect();

    function signIn() {
        const form = document.getElementById('myForm');
        const email = form.email.value;
        if (email.trim().length == 0) {
            alert("Email Field is Empty");
            return false;
        }
        const password = form.password.value;
        if (password.trim().length == 0) {
            alert("Password Field is Empty");
            return false;
        }
        let bool = true;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                bool = false;
                userData = { id: users[i]._id, name: users[i].first_name };
                localStorage.setItem("userId", JSON.stringify(userData));
                window.location.href = '../pages/home.html';
                break;
            }

        }
        if (bool == true) {
            alert("Wrong Email or Password");
        }
    }