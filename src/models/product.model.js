const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    discount: { type: String, required: false },
    price: { type: Number, required: true },
    rating: { type: Number, required: false },
    image: { type: String, required: true },
    deal: { type: String, required: false },
    category: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;