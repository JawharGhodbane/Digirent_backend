var express = require("express");
const {
  AddAgence, DeleteAgence, GetAgence, GetAgences, UpdateAgence
} = require("../controllers/agence.controller");
var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/add", [auth, hasRole(ROLES.CHEF)], AddAgence);
router.put("/update/:id", [auth, hasRole(ROLES.CHEF)], UpdateAgence);
router.delete("/delete/:id", auth, DeleteAgence);
router.get("/", auth, GetAgences);
router.get("/:id", auth, GetAgence);

module.exports = router;