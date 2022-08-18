var express = require("express");
const {
  SendMessage
} = require("../controllers/message.controller");

var router = express.Router();
router.post("/add",  SendMessage);
module.exports = router;