require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const HoldingsModel = require("./model/Holding.model");
const PositionModel = require("./model/Position.model");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/allHoldings', async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.send(allHoldings);
});

app.get('/allPositions', async (req, res) => {
    let allPositions = await PositionModel.find({});
    res.send(allPositions);
});


app.listen(PORT, () => {
    console.log(`server start at http://localhost:${PORT}`);
    mongoose
        .connect(MONGO_URL)
        .then(() => console.log("MongoDB connected succesfully"))
        .catch((err) => console.error("MongoDB connection failed:", err));
});
