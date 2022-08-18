const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};


  data.email = !isEmpty(data.email) ? data.email : "";
  data.mot_de_passe = !isEmpty(data.mot_de_passe) ? data.mot_de_passe : "";


 
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.mot_de_passe)) {
    errors.mot_de_passe = "Required mot_de_passe";
  }
 


  return {
      errors,
      isValid: isEmpty(errors)
  }
};