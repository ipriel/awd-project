const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const specSchema = new Schema({
    title: String,
    desc: String
});

const ProductSchema = new Schema({
    name: String,
    type: String,
    company: String,
    price: Number,
    description: String,
    discount: Number,
    quantity: Number,
    specs: [specSchema],
    showInStore: Boolean
});

const ProductMetaSchema = new Schema({
    name: String,
    type: String,
    company: String,
    importerPrice: Number,
    specs: [specsSchema]
});

const Product = mongoose.model('product', ProductSchema);
const ProductMeta = mongoose.model('productMeta', ProductMetaSchema);

module.exports.Product = Product;
module.exports.ProductMeta = ProductMeta;