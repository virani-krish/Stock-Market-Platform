const router = require("express").Router();
const { createOrder } = require("../controllers/Order.controller");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", authMiddleware,createOrder);

module.exports = router;