const router = require("express").Router();
const { stocksData } = require("../controllers/Stock.controller");


router.get("/", stocksData);

module.exports = router;