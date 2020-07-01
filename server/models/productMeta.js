const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const ProductMetaSchema = new Schema({
    name: String,
    type: String,
    company: String,
    importerPrice: Number,
    specs: [Schema.Types.Mixed]
});

const ProductMeta = mongoose.model('productMeta', ProductMetaSchema);

module.exports.ProductMeta = ProductMeta;