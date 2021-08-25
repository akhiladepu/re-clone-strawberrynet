const express = require('express');

const Product = require('../models/product.model');

const router = express.Router();

router.post("", async (req, res) => {
    const product = await Product.create(req.body);

    return res.send(product)
});

router.get("", async (req, res) => {
    const products = await Product.find().lean().exec();

    return res.send(products);
});

router.delete("/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    return res.send(product);
});

module.exports = router;