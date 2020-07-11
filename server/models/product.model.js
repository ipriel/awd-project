const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const ProductSchema = new Schema({
    name: String,
    type: String,
    company: String,
    image: { data: Buffer, contentType: String },
    price: Number,
    description: String,
    discount: Number,
    quantity: Number,
    specs: [Schema.Types.Mixed],
    showInStore: Boolean
});

ProductSchema.plugin(mongoose_fuzzy_searching, { fields: ['name', 'company'] });

const Product = mongoose.model('product', ProductSchema);

module.exports.Product = Product;