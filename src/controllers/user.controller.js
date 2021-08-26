const express = require('express');

const User = require('../models/user.model');

const router = express.Router();

router.post("", async (req, res) => {

    const user = await User.create(req.body);

    return res.send(user)
});

router.get("", async (req, res) => {
    const users = await User.find().lean().exec();

    return res.send(users);
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec();

    return res.send(user);
});

router.patch("", async (req, res) => {

    let updateValue = { wishlist: req.body.wishlist };
    
    const user = await User.findByIdAndUpdate(req.body._id, updateValue, {new:true});


    return res.send(user);
});

router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    return res.send(user);
});

module.exports = router;