require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { fetchPrice, getCachedPrice } = require("./services/yahoo.service");
const isMarketOpen = require("./utils/marketTime");
const authMiddleware = require("./middleware/AuthMiddleware");

// model
const { HoldingModel } = require("./model/Holding.model");
const { PositionModel } = require("./model/Position.model");
const { OrderModel } = require("./model/Order.model");
// routes
const authRoute = require("./router/Auth.route");
const stockRoute = require("./router/Stock.route");
const holdingRoute = require("./router/Holding.route");
const positionRoute = require("./router/Position.route");
const orderRoute = require("./router/Order.route");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();


app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// start background job
fetchPrice();
setInterval(() => {
    if (isMarketOpen()) fetchPrice();
}, 5000);


app.use("/stocks", stockRoute);

app.use("/auth", authRoute);

app.use("/holding", holdingRoute);

app.use("/position", positionRoute);

app.use("/order", orderRoute);

// app.post("/newOrder", authMiddleware, async (req, res) => {
//     let { symbol, name, qty, price, mode } = req.body;
//     const userId = req.user._id;
//     qty = Number(qty);
//     price = Number(price);

//     if (req.body.mode == "BUY") {
//         let newOrder = new OrderModel({
//             user: userId,
//             symbol: symbol,
//             name: name,
//             qty: qty,
//             price: price,
//             mode: mode,
//         });
//         await newOrder.save();

//         // Add stock to holding
//         const holding = await HoldingModel.findOne({ symbol, user: userId });

//         // if stock purches second time
//         if (holding) {
//             const newQty = holding.qty + qty;
//             const newAvg = ((holding.qty * holding.avgPrice) + (qty * price)) / newQty;

//             holding.qty = newQty;
//             holding.avgPrice = newAvg;

//             await holding.save();
//         }
//         // if stock purches first time
//         else {
//             await HoldingModel.create({
//                 user: userId,
//                 symbol,
//                 name,
//                 qty,
//                 avgPrice: price
//             });
//         }

//         return res.status(200).json({ message: "order Saved!", success: true });
//     } else if (req.body.mode == "SELL") {

//         const holding = await HoldingModel.findOne({
//             symbol,
//             user: userId
//         });

//         if (!holding || holding.qty < qty) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Insufficient stock quantity",
//             });
//         }

//         let newOrder = new OrderModel({
//             user: userId,
//             symbol: symbol,
//             name: name,
//             qty: qty,
//             price: price,
//             mode: mode,
//         });

//         await newOrder.save();

//         // reduce stock from holding
//         holding.qty -= qty;

//         if (holding.qty === 0) {
//             await HoldingModel.deleteOne({ symbol });
//         } else {
//             await holding.save();
//         }


//         return res.status(200).json({ message: "order Saved!", success: true });
//     } else {
//         return res.status(400).json({ message: "Something went wronge", success: false });
//     }

// });


app.listen(PORT, () => {
    console.log(`server start at http://localhost:${PORT}`);
    mongoose
        .connect(MONGO_URL)
        .then(() => console.log("MongoDB connected succesfully"))
        .catch((err) => console.error("MongoDB connection failed:", err));
});
