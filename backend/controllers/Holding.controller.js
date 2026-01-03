const { HoldingModel } = require("../model/Holding.model");
const { getCachedPrice } = require("../services/yahoo.service");

module.exports.allHoldings = async (req, res) => {
    const userId = req.user._id;
    let allHoldings = await HoldingModel.find({ user: userId });

    const { stockCache } = getCachedPrice();

    const result = allHoldings.map(h => {
        const live = stockCache[h.symbol];

        const ltp = live ? live.price : h.avgPrice;
        const prevClose = live
            ? live.price - live.change
            : h.avgPrice;

        return {
            symbol: h.symbol,
            name: h.name,
            qty: h.qty,
            avgPrice: h.avgPrice,

            ltp,
            currentValue: h.qty * ltp,

            netPnl: (ltp - h.avgPrice) * h.qty,
            netPnlPercent: ((ltp - h.avgPrice) / h.avgPrice) * 100,

            dayChange: (ltp - prevClose) * h.qty,
            dayChangePercent: ((ltp - prevClose) / prevClose) * 100
        };
    });

    res.send(result);
}