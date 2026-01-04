const { walletData } = require("../controllers/Wallet.controller");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = require("express").Router();

router.get("/", authMiddleware, walletData);

module.exports = router;