const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and Model
const ShopAddressSchema = new Schema({
  latitude: Number,
  longitude: Number,
});

const ShopAddress = mongoose.model(
  "shopAddresses",
  ShopAddressSchema,
  "shopAddresses"
);

module.exports.ShopAddress = ShopAddress;
