const { Schema } = require("mongoose");

const HoldingSchema = new Schema({

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