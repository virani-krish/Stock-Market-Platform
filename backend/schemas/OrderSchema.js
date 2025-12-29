const { Schema, Types } = require("mongoose");

const OrderSchema = new Schema({
    name: {
        type: String,
    },
    qty: {
        type: Number,
    },
    price: {
        type: Number,
    },
    mode: {
        type: String
    }
});

module.exports = { OrderSchema };