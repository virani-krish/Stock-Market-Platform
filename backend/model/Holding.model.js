const { model } = require("mongoose");

const { HoldingSchema } = require("../schemas/holdingSchema");

const HoldingModel = new model("holding", HoldingSchema);

module.exports = HoldingModel;