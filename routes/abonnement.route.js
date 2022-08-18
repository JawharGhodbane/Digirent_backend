var express = require("express");
var router = express.Router();
const { PayMonth,PaySixMonth,PayYear } = require("../controllers/abonnement.controller");
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/month",[auth, hasRole(ROLES.CHEF)],PayMonth);
router.post("/six",[auth, hasRole(ROLES.CHEF)],PaySixMonth);
router.post("/year",[auth, hasRole(ROLES.CHEF)],PayYear);

module.exports = router;