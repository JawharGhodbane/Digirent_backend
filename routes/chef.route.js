var express = require("express");
const {
  DeleteChef, UpdateChef, GetOneChef, GetChefs
} = require("../controllers/chefAgence.controller");
const {
  Register
} = require("../controllers/auth.controller");
var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/register", (req, res) => Register(req, res, ROLES.CHEF));
router.delete("/delete/:id", /*[auth, hasRole(ROLES.CHEF)],*/ DeleteChef);
router.put("/update/:id",/*[auth, hasRole(ROLES.CHEF)],*/ UpdateChef);
router.get("/:id", /*[auth, hasRole(ROLES.CHEF)],*/ GetOneChef);
router.get("/", /*[auth, hasRole(ROLES.CHEF)],*/ GetChefs);

module.exports = router;