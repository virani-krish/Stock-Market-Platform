const isMarketOpen = require("../utils/marketTime");
const { getCachedPrice } = require("../services/yahoo.service");

module.exports.stocksData = (req, res) => {
    const { data, lastUpdated } = getCachedPrice();

    if (!data.length) {
        return res.status(503).json({ error: "Stock data not ready" });
    }

    res.json({
        marketOpen: isMarketOpen(),
        lastUpdated,
        data,
    });
}