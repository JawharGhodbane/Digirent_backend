var express = require("express");
const {
  NbrTotVoiture,
  NbrVoitureDispo,
  NbrVoitureNonDispo,
  NbrEmp,
  totalDepenses,
  totalRevenus,
  RevenusNet
} = require("../controllers/stats.controller");
var router = express.Router();
const { auth, hasRole, ROLES } = require("../middlewares");

//Voiture stats
router.get("/nbrtotvoiture", [auth, hasRole(ROLES.CHEF)],NbrTotVoiture);
router.get("/nbrVoitDispo", [auth, hasRole(ROLES.CHEF)],NbrVoitureDispo);
router.get("/nbrVoitNonDispo", [auth, hasRole(ROLES.CHEF)],NbrVoitureNonDispo);

//Employe stats
router.get("/nbrEmp", [auth, hasRole(ROLES.CHEF)],NbrEmp);

//revenus and depense stats
router.get("/totDepenses", [auth, hasRole(ROLES.CHEF)],totalDepenses);
router.get("/totRevenus", [auth, hasRole(ROLES.CHEF)],totalRevenus);
router.get("/net", [auth, hasRole(ROLES.CHEF)],RevenusNet);


module.exports = router;