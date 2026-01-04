const { WalletModel } = require("../model/Wallet.model");

module.exports.walletData = async (req, res) => {
    const userId = req.user._id;

    const wallet = await WalletModel.findOne({ user: userId });

    res.status(200).json(wallet);

}