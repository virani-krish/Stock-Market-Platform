const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/User.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ status: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ status: false });
    }

    req.user = user; // attach user
    next();
  } catch (err) {
    return res.status(401).json({ status: false });
  }
};

module.exports = authMiddleware;
