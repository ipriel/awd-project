const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = require('./product');

// Create Schema and Model
const addressSchema = new Schema({
    firstName: String,
    lastName: String,
    Country: String,
    City: String,
    addressLine: String,
    zipCode: Number
});

const UserSchema = new Schema({
    userId: Number,
    prefix: String,
    firstName: String,
    lastName: String,
    address: addressSchema,
    email: String,
    orders: [Number],
    cart: [product.Product],
    shippingAddress: [addressSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports.User = User;
module.exports.addressSchema = addressSchema;