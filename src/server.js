const express = require('express');

const connect = require("./configs/db");

const productController = require("./controllers/product.controller")

const userController = require("./controllers/user.controller")

const app = express();

app.use(express.json());

app.use("/products", productController);

app.use("/users", userController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening on port 2345");
})