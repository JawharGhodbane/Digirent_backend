var express = require("express");
const { AddVoiture,
    DeleteVoiture,
    GetOneVoiture,
    GetVoitures,
    UpdateVoiture
} = require("../controllers/voiture.controller");
var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

router.post("/add", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], AddVoiture);
router.delete("/delete/:id", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], DeleteVoiture);
router.put("/update/:id", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], UpdateVoiture);
router.get("/:id", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], GetOneVoiture);
router.get("/", [auth, hasRole(ROLES.CHEF, ROLES.EMPLOYE)], GetVoitures);

module.exports = router;