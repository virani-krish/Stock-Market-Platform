const { Schema, default: mongoose } = require("mongoose");

const HoldingSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
    },
    qty: {
        type: Number,
    },
    avg: {
        type: Number,
    },
    price: {
        type: Number
    },
    net: {
        type: String,
    },
    day: {
        type: String
    }


});

module.exports = { HoldingSchema };