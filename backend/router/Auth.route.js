const { Signup, Login } = require("../Controllers/Auth.controller");
const authMiddleware = require("../middleware/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);

router.post("/verify", authMiddleware, (req, res) => {
    res.json({
        status: true,
        user: req.user.username,
    });
});

module.exports = router;