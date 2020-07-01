const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user')
const product = require('./product');

// Create Schema and Model
const statusSchema = new Schema({
    update_time: Date,
    status: Number
});

const OrdersSchema = new Schema({
    orderId: Number,
    userId: Number,
    date: Date,
    shippingAddress: user.addressSchema,
    billingAddress: user.addressSchema,
    status: [statusSchema],
    totalPrice: Number,
    items: [product.Product]
});

const Order = mongoose.model('order', OrdersSchema);

module.exports = Order;