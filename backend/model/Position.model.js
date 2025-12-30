const { model } = require("mongoose");

const { PositionSchema } = require("../schemas/PositionSchema");

const PositionModel = new model("position", PositionSchema);

module.exports = { PositionModel };