const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addressSchema } = require('./user.model');

// Create Schema and Model
const statusSchema = new Schema({
    update_time: Date,
    update_by: { type: Schema.Types.ObjectId, ref: 'User' },
    status: Number, // 0 - New/Received, 1 - Ready, 2 - Transit, 3 - Delivered
});

const OrdersSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    shippingAddress: addressSchema,
    billingAddress: addressSchema,
    status: [statusSchema],
    totalPrice: Number,
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    shippingType: Number,
    delivery_confirmation: {
        name: String,
        signature: { data: Buffer, contentType: String }
    }
});

const Order = mongoose.model('order', OrdersSchema);

module.exports.Order = Order;