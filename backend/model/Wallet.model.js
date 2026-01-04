const { model } = require("mongoose");
const { WalletSchema } = require("../schemas/WalletSchema");

const WalletModel = new model("wallet", WalletSchema);

module.exports = { WalletModel };