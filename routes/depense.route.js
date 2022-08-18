var express = require("express");
const {
  AddDepense,DeleteDepense,GetOneDepense,GetDepenses,UpdateDepense
} = require("../controllers/depense.controller");
var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/add",[auth, hasRole(ROLES.CHEF)],AddDepense);
router.delete("/delete/:id", [auth, hasRole(ROLES.CHEF)],DeleteDepense);
router.put("/update/:id",[auth, hasRole(ROLES.CHEF)],UpdateDepense);
router.get("/:id", [auth, hasRole(ROLES.CHEF)],GetOneDepense);
router.get("/", [auth, hasRole(ROLES.CHEF)],GetDepenses);

module.exports = router;