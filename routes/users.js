var express = require('express');
var router = express.Router();
const UserController = require("../controllers/userController");
/* GET users listing. */
router.get('/get-all', UserController.getAll);
router.post("/add-user", UserController.addUser);
module.exports = router;
