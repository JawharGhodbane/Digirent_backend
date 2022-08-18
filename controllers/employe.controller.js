const User = require('../models/userSchema');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ValidateRegister = require("../validation/register");
const ValidateLogin = require("../validation/login");
const ObjectId = require('mongoose').Types.ObjectId;


// Add employe
const AddEmploye = async (req ,res)=>{
  const { errors, isValid } = ValidateRegister(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        User.findOne({ email: req.body.email }).then(async(exist) => {
          if (exist) {
            errors.email = "chef existe";
            res.status(404).json(errors);
          } else {
            const hash = bcrypt.hashSync(req.body.mot_de_passe, 10)//hashed password
            req.body.mot_de_passe = hash;
            req.body.role = "EMPLOYE";
            req.body.agence = req.user.agence;

              //Insert photo 
              if (req.files) { //if a photo exists

                if (req.files.pdp) { // pdp = name of the input(frontend)
    
                    //Use the name of the input field (i.e. "pdp") to retrieve the uploaded file
                    let pdp = req.files.pdp;
    
                    //Use the mv() method to place the file in upload directory (i.e. "uploads")
                    pdp.mv('./public/' + pdp.name);
                    req.body.photo = pdp.name;
                }
            }

            await User.create(req.body);
            res.status(200).json({ message: "Inscription reussie" });
          }
        });
      }
    } catch (error) {
      res.status(404).json(error.message);
    }
}; 

//Login employe
const LoginEmploye = async (req ,res)=>{
  const {errors, isValid} = ValidateLogin(req.body)
try {
  if(!isValid){
   res.status(404).json(errors)
  }else{
      User.findOne({email: req.body.email})
  .then(_User=>{
    if(!_User){
      errors.email = "not found chef"
      res.status(404).json(errors)
    }else{
      bcrypt.compare(req.body.mot_de_passe, _User.mot_de_passe)
      .then(isMatch=>{
        if(!isMatch){
          errors.password = "mot de passe incorrecte"
          res.status(404).json(errors)
        }else{
          var token = jwt.sign({ 
            id: _User._id,
            nom: _User.nom,
            email: _User.email,
            role: _User.role
           }, process.env.TOKEN_KEY,  { expiresIn: '1h' });
           res.status(200).json({
             message: "success",
             token: "Bearer "+token
           })
        }
      })
    }
  })
  }
} catch (error) {
res.status(404).json(error.message);
}
};

// DELETE employe
const DeleteEmploye = async (req ,res)=>{
  try {
    const data =  await User.findOneAndRemove({_id: req.params.id})
    res.status(200).json({message: "deleted"})

 } catch (error) {
     res.status(404).json(error.message)
 }
}

// UPDATE employe
const UpdateEmploye = async (req ,res)=>{

    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Aucun User avec l'id : ${req.params.id}`);
    var _User = //req.body;
    {
        nom: req.body.nom,
        num_tel: req.body.num_tel,
        email: req.body.email,
        photo: req.body.photo
    };

     //Insert photo 
   if (req.files) { //if a photo exists

    if (req.files.pdp) { // pdp = name of the input(frontend)

        //Use the name of the input field (i.e. "pdp") to retrieve the uploaded file
        let pdp = req.files.pdp;
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        pdp.mv('./public/' + pdp.name);
        photo = pdp.name;
    }
}

    User.findByIdAndUpdate(req.params.id, { $set: _User }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur User update :' + JSON.stringify(err, undefined,2)); }
    });
};

//get by ID
const GetOneEmploye = async (req ,res)=>{
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Aucun User avec l'id : ${req.params.id}`);

    User.findById(req.params.id,(err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Erreur: aucun User trouvé :' + JSON.stringify(err, undefined, 2)); }
    });
};

//GET ALL
const GetEmployes = async (req ,res)=>{
  try {
    const data =  await User.find({role:"EMPLOYE",agence:req.user.agence}).populate('agence', ["nom_agence"]);
    res.status(200).json(data)

 } catch (error) {
     res.status(404).json(error.message)
 }
};

//Change password
const ChangePassword = async (req ,res)=>{
  const id = req.params.id;
  const _User = await User.findById(id).select('+mot_de_passe');
  if (_User) {
      old_mdp = req.body.mot_de_passe;
      new_mdp = req.body.new_mot_de_passe;
      if (await bcrypt.compare(old_mdp, _User.mot_de_passe)) {
          _User.mot_de_passe = await bcrypt.hash(new_mdp, 10);
          await User.findByIdAndUpdate(id, _User);
          res.send("mot de passe modifié avec succés");
      }
      else {
          res.status(400).send("Meme mot de passe");
      }
  }
  else {
      res.send("User non trouvé");
  }
};

module.exports = {
    AddEmploye,
    DeleteEmploye,
    GetOneEmploye,
    GetEmployes,
    UpdateEmploye,
    LoginEmploye,
    ChangePassword
}