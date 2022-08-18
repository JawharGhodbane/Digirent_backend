var express = require("express");
const {
  Login, ChangePassword
} = require("../controllers/auth.controller");
var router = express.Router();
const { auth } = require("../middlewares");

router.post("/login", Login);
router.put("/change_mdp/:id", auth, ChangePassword);

module.exports = router;