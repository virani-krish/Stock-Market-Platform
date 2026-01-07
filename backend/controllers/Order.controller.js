const { HoldingModel } = require("../model/Holding.model");
const { OrderModel } = require("../model/Order.model");
const { WalletModel } = require("../model/Wallet.model");

module.exports.createOrder = async (req, res) => {
    let { symbol, name, qty, price, mode } = req.body;
    const userId = req.user._id;
    qty = Number(qty);
    price = Number(price);

    let wallet = await WalletModel.findOne({ user: userId });
    if (!wallet) {
        return res.status(400).json({
            success: false,
            message: "Wallet not found"
        });
    }

    if (mode == "BUY") {

        if (wallet.availableBalance < price * qty) {
            return res.status(400).json({
                success: false,
                message: "you have not enough balance"
            });
        }

        wallet.availableBalance = wallet.availableBalance - (qty * price);
        wallet.usedBalance = wallet.usedBalance + (qty * price);
        await wallet.save();

        let newOrder = new OrderModel({
            user: userId,
            symbol: symbol,
            name: name,
            qty: qty,
            price: price,
            mode: mode,
        });
        await newOrder.save();

        // Add stock to holding
        // const holding = await HoldingModel.findOne({ symbol, user: userId });

        // // if stock purches second time
        // if (holding) {
        //     const newQty = holding.qty + qty;
        //     const newAvg = ((holding.qty * holding.avgPrice) + (qty * price)) / newQty;

        //     holding.qty = newQty;
        //     holding.avgPrice = newAvg;

        //     await holding.save();
        // }
        // // if stock purches first time
        // else {
        //     await HoldingModel.create({
        //         user: userId,
        //         symbol,
        //         name,
        //         qty,
        //         avgPrice: price
        //     });
        // }

        return res.status(200).json({ message: "order Saved!", success: true });
    } else if (mode == "SELL") {

        const holding = await HoldingModel.findOne({
            symbol,
            user: userId
        });

        if (!holding || holding.qty < qty) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock quantity",
            });
        }

        wallet.availableBalance = wallet.availableBalance + (price * qty);
        wallet.usedBalance = wallet.usedBalance - (holding.avgPrice * qty);
        await wallet.save();

        let newOrder = new OrderModel({
            user: userId,
            symbol: symbol,
            name: name,
            qty: qty,
            price: price,
            mode: mode,
        });

        await newOrder.save();

        // reduce stock from holding
        holding.qty -= qty;

        if (holding.qty === 0) {
            await HoldingModel.deleteOne({ symbol, user: userId });
        } else {
            await holding.save();
        }


        return res.status(200).json({ message: "order Saved!", success: true });
    } else {
        return res.status(400).json({ message: "Something went wronge", success: false });
    }

}