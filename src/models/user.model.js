const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    wishlist: [{ type: Object, required: false}],
    bag: [{ type: Object, required: false}],
}, {
    versionKey: false,
    timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User;