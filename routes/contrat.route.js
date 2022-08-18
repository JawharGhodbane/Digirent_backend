var express = require("express");
const {
  AddContrat,DeleteContrat,getContrats
} = require("../controllers/contrat.controller");
var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/add",[auth, hasRole(ROLES.CHEF)],AddContrat);
router.delete("/delete/:id", [auth, hasRole(ROLES.CHEF)],DeleteContrat);
router.get("/", [auth, hasRole(ROLES.CHEF)],getContrats);

module.exports = router;