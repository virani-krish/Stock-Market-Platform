const { Schema, Types } = require("mongoose");

const OrderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    symbol: {
        type: String,
    },
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
    },
    status: {
        type: String,
        enum: ["PENDING", "EXECUTED", "CANCELLED"],
        default: "PENDING"
    }
});

module.exports = { OrderSchema };