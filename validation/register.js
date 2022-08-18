const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};

  data.nom = !isEmpty(data.nom) ? data.nom : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.num_tel = !isEmpty(data.num_tel) ? data.num_tel : "";
  data.mot_de_passe = !isEmpty(data.mot_de_passe) ? data.mot_de_passe : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";

  if (validator.isEmpty(data.nom)) {
    errors.nom = "Required nom chef";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.num_tel)) {
    errors.num_tel = "Required numero de telephone";
  }
  if (validator.isEmpty(data.mot_de_passe)) {
    errors.mot_de_passe = "Required mot_de_passe";
  }
  if(!validator.equals(data.mot_de_passe, data.confirm)){
    errors.confirm = "mot_de_passes not matches";
  }
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Required confirm";
  }
  


  return {
      errors,
      isValid: isEmpty(errors)
  }
};