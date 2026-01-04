const router = require("express").Router();
const { stocksData } = require("../controllers/Stock.controller");
const authMiddleware = require("../middleware/AuthMiddleware");


router.get("/",authMiddleware, stocksData);

module.exports = router;