require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { fetchPrice, getCachedPrice } = require("./services/yahoo.service");
const isMarketOpen = require("./utils/marketTime");

// routes
const authRoute = require("./router/Auth.route");
const stockRoute = require("./router/Stock.route");
const holdingRoute = require("./router/Holding.route");
const positionRoute = require("./router/Position.route");
const orderRoute = require("./router/Order.route");
const walletRoute = require("./router/Wallet.route");

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

app.use("/wallet", walletRoute);


app.listen(PORT, () => {
    console.log(`server start at http://localhost:${PORT}`);
    mongoose
        .connect(MONGO_URL)
        .then(() => console.log("MongoDB connected succesfully"))
        .catch((err) => console.error("MongoDB connection failed:", err));
});
