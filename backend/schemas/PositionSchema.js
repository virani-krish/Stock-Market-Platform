const { Schema } = require("mongoose");

const PositionSchema = new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    product: {
        type: String,
    },
    symbol: {
        type: String,
    },
    qty: {
        type: Number,
    },
    avgPrice: {
        type: Number,
    },
    price: {
        type: Number,
    },
    net: {
        type: String,
    },
    day: {
        type: String,
    },
    isLoss: {
        type: Boolean,
    }
});

module.exports = { PositionSchema };