const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const mongoose = require("mongoose");
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
  specs: Schema.Types.Mixed,
  showInStore: Boolean,
});

ProductSchema.plugin(mongoose_fuzzy_searching, { fields: ["name", "company"] });

const Product = mongoose.model("product", ProductSchema);

module.exports.Product = Product;

module.exports.search = (ids) => {
  const query = {};

  if (ids) {
    query._id = { $in: ids.map((id) => mongoose.Types.ObjectId(id)) };
  }

  return new Promise((res, rej) => {
    Product.find(query, "_id name image price description type", (err, products) => {
      if (err) {
        return rej(err);
      } else {
        res(
          products.map((productModel) => {
            const { _id, ...product } = productModel.toJSON();
            return { ...product, productID: _id };
          })
        );
      }
    });
  });
};
