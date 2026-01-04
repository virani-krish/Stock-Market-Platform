const { Schema } = require("mongoose");

const WalletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    usedBalance: {
        type: Number,
        required: true
    },
    availableBalance: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = { WalletSchema };