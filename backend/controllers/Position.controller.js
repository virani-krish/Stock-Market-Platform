const { PositionModel } = require("../model/Position.model");

module.exports. allPositions = async (req, res) => {
    const userId = req.user._id;
    let allPositions = await PositionModel.find({ user: userId });
    res.send(allPositions);
}