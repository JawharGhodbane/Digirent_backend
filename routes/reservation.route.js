var express = require("express");
const { AddRes,
    DeleteRes,
    GetOneRes,
    GetAllRes,
    UpdateRes
} = require("../controllers/reservation.controller");
var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/add", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], AddRes);
router.delete("/delete/:id", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], DeleteRes);
router.put("/update/:id", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], UpdateRes);
router.get("/:id", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], GetOneRes);
router.get("/", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], GetAllRes);

module.exports = router;