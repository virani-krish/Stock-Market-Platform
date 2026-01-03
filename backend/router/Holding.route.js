const router = require("express").Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const { allHoldings } = require("../controllers/Holding.controller");

router.get("/", authMiddleware, allHoldings);

module.exports = router;