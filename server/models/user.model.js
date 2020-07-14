const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    userId: { type: String, unique: true},
    prefix: String,
    firstName: String,
    lastName: String,
    address: addressSchema,
    email: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    shippingAddress: [addressSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports.User = User;
module.exports.addressSchema = addressSchema;