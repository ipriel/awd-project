const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const ProductSchema = new Schema({
    name: String,
    type: String,
    company: String,
    price: Number,
    description: String,
    discount: Number,
    quantity: Number,
    specs: [Schema.Types.Mixed],
    showInStore: Boolean
});

const Product = mongoose.model('product', ProductSchema);

module.exports.Product = Product;