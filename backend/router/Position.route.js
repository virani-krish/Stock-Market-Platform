const router = require("express").Router();
const { allPositions } = require("../controllers/Position.controller");
const authMiddleware = require("../middleware/AuthMiddleware");

router.get("/", authMiddleware, allPositions);

module.exports = router;