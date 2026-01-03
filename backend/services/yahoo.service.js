const YahooFinance = require("yahoo-finance2").default;

const yf = new YahooFinance();

// Watchlist
const SYMBOLS = [
  "INFY.NS",
  "TCS.NS",
  "ONGC.NS",
  "ITC.NS",
  "WIPRO.NS",
  "RELIANCE.NS",
  "HDFCBANK.NS",
  "SBIN.NS",
  "LT.NS",
  "M&M.NS",
];

let stockCache = {};
let lastUpdated = null;

async function fetchPrice() {

  try {
    console.log("Fetching stock data...");

    const results = await Promise.all(
      SYMBOLS.map((symbol) => yf.quote(symbol))
    );

    results.forEach((stock) => {
      stockCache[stock.symbol] = {
        symbol: stock.symbol,
        name: stock.shortName,
        price: stock.regularMarketPrice,
        change: stock.regularMarketChange,
        percent: stock.regularMarketChangePercent,
      };
    });

    lastUpdated = new Date();
    console.log("Stocks updated");

  } catch (err) {
    console.error("Yahoo fetch error:", err.message);
  }
}

function getCachedPrice() {
  return {
    stockCache,
    data: Object.values(stockCache),
    lastUpdated,
  };
}

module.exports = { fetchPrice, getCachedPrice };
