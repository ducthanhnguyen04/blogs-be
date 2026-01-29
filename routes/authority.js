var express = require('express');
var router = express.Router();
const AuthorityController = require("../controllers/authorityController");
/* GET home page. */
router.get('/get-all', AuthorityController.getAll);

module.exports = router;
