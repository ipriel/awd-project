const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const ProductMetaSchema = new Schema({
    name: String,
    type: String,
    company: String,
    image: { data: Buffer, contentType: String },
    importerPrice: Number,
    specs: [Schema.Types.Mixed]
});

ProductMetaSchema.plugin(mongoose_fuzzy_searching, { fields: ['name', 'company'] });

const ProductMeta = mongoose.model('productMeta', ProductMetaSchema);

module.exports.ProductMeta = ProductMeta;