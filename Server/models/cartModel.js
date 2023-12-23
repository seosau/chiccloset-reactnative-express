const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Cart', Cart);