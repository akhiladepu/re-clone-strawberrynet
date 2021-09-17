const express = require('express');
cors=require('cors')

const connect = require("./configs/db");

const productController = require("./controllers/product.controller")

const userController = require("./controllers/user.controller")

const homePageController = require("./controllers/home.controller")

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    // res.sendFile("/sampleProject/pages" + '/home.html');
    // res.sendFile('home.html', { root: sampleProject });
    res.sendFile('/pages/home.html', { root: '.' });
});

app.get("/:folder/:pageName", (req, res) => {
        // console.log('pageName:', req.params.pageName)

    // res.sendFile("/sampleProject/pages" + '/home.html');
    // res.sendFile('home.html', { root: sampleProject });
    res.sendFile(`/${req.params.folder}/${req.params.pageName}`, { root: '.' });
});

app.use("/products", productController);

app.use("/users", userController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening on port 2345");
})