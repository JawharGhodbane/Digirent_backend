var express = require("express");
const {
  AddEmploye, GetEmployes, GetOneEmploye, UpdateEmploye, DeleteEmploye
} = require("../controllers/employe.controller");

var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/add", [auth, hasRole(ROLES.CHEF)], AddEmploye);
router.delete("/delete/:id", [auth, hasRole(ROLES.CHEF)], DeleteEmploye);
router.put("/update/:id", [auth, hasRole(ROLES.CHEF)], UpdateEmploye);
router.get("/", [auth, hasRole(ROLES.CHEF)], GetEmployes);
router.get("/:id", [auth, hasRole(ROLES.CHEF)], GetOneEmploye);

module.exports = router;