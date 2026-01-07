const { OrderModel } = require("../model/Order.model");
const { getCachedPrice } = require("./yahoo.service");

module.exports.limitOrderProcessor = async () => {

    const orders = await OrderModel.find({ status: "PENDING" });
    const { stockCache } = getCachedPrice();

    for (const order of orders) {

        const priceData = stockCache[order.symbol];
        if (!priceData) continue;

        const currentPrice = priceData.price;

        if (!currentPrice) return;

        if (order.mode === "BUY" && currentPrice <= order.price) {
            // execute
        }

        if (order.mode === "SELL" && currentPrice >= order.price) {
            //  execute
        }

    }

}