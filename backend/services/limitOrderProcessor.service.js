const { HoldingModel } = require("../model/Holding.model");
const { OrderModel } = require("../model/Order.model");
const { getCachedPrice } = require("./yahoo.service");
const mongoose = require("mongoose");

module.exports.limitOrderProcessor = async () => {

    console.log("-------------------------price check");

    const orders = await OrderModel.find({ status: "PENDING" });
    const { stockCache } = getCachedPrice();

    for (const order of orders) {

        const priceData = stockCache[order.symbol];
        if (!priceData) continue;

        const currentPrice = priceData.price;
        if (!currentPrice) continue;

        if (order.mode === "BUY" && currentPrice <= order.price) {
            let session;
            try {

                session = await mongoose.startSession();
                session.startTransaction();

                const lockedOrder = await OrderModel.findOneAndUpdate(
                    { _id: order._id, status: "PENDING" },
                    { status: "PROCESSING" },
                    { session }
                );

                // if lockedOrder is false means order process by another cycle.
                if (!lockedOrder) {
                    await session.abortTransaction();
                    session.endSession();
                    continue;
                };

                // stock add from holdings
                await executeBuy(lockedOrder, currentPrice, session);

                // marks as order executed
                await OrderModel.updateOne(
                    { _id: lockedOrder._id },
                    {
                        $set: {
                            status: "EXECUTED",
                            executedPrice: currentPrice,
                            executedAt: new Date()
                        }
                    },
                    { session }
                );

                await session.commitTransaction();
                session.endSession();

            } catch (error) {

                if (session) {
                    await session.abortTransaction();
                    session.endSession();
                }

                await OrderModel.updateOne(
                    { _id: order._id },
                    {
                        $set: {
                            status: "FAILED"
                        }
                    }
                );
            }
        }

        if (order.mode === "SELL" && currentPrice >= order.price) {

            const lockedOrder = await OrderModel.findOneAndUpdate(
                { _id: order._id, status: "PENDING" },
                { status: "PROCESSING" }
            );

            // if lockedOrder is false means order process by another cycle.
            if (!lockedOrder) continue;

            try {

                // stock reduce from holding
                await executeSell(lockedOrder, currentPrice);

                // marks as order executed
                lockedOrder.status = "EXECUTED";
                lockedOrder.executedPrice = currentPrice;
                lockedOrder.executedAt = new Date();
                await lockedOrder.save();

            } catch (error) {

                lockedOrder.status = "FAILED";
                await lockedOrder.save();

            }

        }

    }

}

async function executeBuy(order, executedPrice, session) {

    const holding = await HoldingModel.findOne({ symbol: order.symbol, user: order.user },null, { session });

    // if stock purches second time
    if (holding) {
        const newQty = holding.qty + order.qty;
        const newAvg = ((holding.qty * holding.avgPrice) + (order.qty * executedPrice)) / newQty;

        holding.qty = newQty;
        holding.avgPrice = newAvg;

        await holding.save({ session });
    }
    // if stock purches first time
    else {
        await HoldingModel.create([{
            user: order.user,
            symbol: order.symbol,
            name: order.name,
            qty: order.qty,
            avgPrice: executedPrice
        }],
            { session });
    }

}

async function executeSell(order, executedPrice) {

    const holding = await HoldingModel.findOne({ symbol: order.symbol, user: order.user });

    if (!holding || holding.qty < order.qty) {
        throw new Error("Invalid SELL execution");
    }

    holding.qty -= order.qty;

    if (holding.qty === 0) {
        await HoldingModel.deleteOne({ symbol, user: order.user });
    } else {
        await holding.save();
    }

}