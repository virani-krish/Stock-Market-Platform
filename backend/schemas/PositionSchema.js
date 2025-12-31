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