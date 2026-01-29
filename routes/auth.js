var express = require('express');
var router = express.Router();
const AuthController = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");

/* GET home page. */
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get("/me", authenticateToken, (req, res) => {
    res.json({
        user: req.user
    })
})
router.post("/logout", AuthController.logout);
module.exports = router;
