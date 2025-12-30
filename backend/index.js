require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// model
const { HoldingModel } = require("./model/Holding.model");
const { PositionModel } = require("./model/Position.model");
const { OrderModel } = require("./model/Order.model");
// routes
const authRoute = require("./router/Auth.route");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);

app.get('/allHoldings', async (req, res) => {
    let allHoldings = await HoldingModel.find({});
    res.send(allHoldings);
});

app.get('/allPositions', async (req, res) => {
    let allPositions = await PositionModel.find({});
    res.send(allPositions);
});

app.post("/newOrder", async (req, res) => {
    const { name, qty, price, mode } = req.body;

    if (req.body.mode == "BUY") {
        let newOrder = new OrderModel({
            name: name,
            qty: qty,
            price: price,
            mode: mode,
        });
        await newOrder.save();

        // Add stock to holding
        const holding = await HoldingModel.findOne({ name });

        // if stock purches second time
        if (holding) {
            const newQty = holding.qty + qty;
            const newAvg = ((holding.qty * holding.avg) + (qty * price)) / newQty;

            holding.qty = newQty;
            holding.avg = newAvg;

            await holding.save();
        }
        // if stock purches first time
        else {
            await HoldingModel.create({
                name,
                qty,
                avg: price
            });
        }

        return res.status(200).json({ message: "order Saved!", success: true });
    } else if (req.body.mode == "SELL") {

        const holding = await HoldingModel.findOne({
            name,
        });

        if (!holding || holding.qty < qty) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock quantity",
            });
        }

        let newOrder = new OrderModel({
            name: name,
            qty: qty,
            price: price,
            mode: mode,
        });

        await newOrder.save();

        // reduce stock from holding
        holding.qty -= qty;

        if (holding.qty === 0) {
            await HoldingModel.deleteOne({ name });
        } else {
            await holding.save();
        }


        return res.status(200).json({ message: "order Saved!", success: true });
    } else {
        return res.status(400).json({ message: "Something went wronge", success: false });
    }

});


app.listen(PORT, () => {
    console.log(`server start at http://localhost:${PORT}`);
    mongoose
        .connect(MONGO_URL)
        .then(() => console.log("MongoDB connected succesfully"))
        .catch((err) => console.error("MongoDB connection failed:", err));
});
