const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ValidateRegister = require("../validation/register");
const ValidateLogin = require("../validation/login");
const ObjectId = require("mongoose").Types.ObjectId;
const path = require('path');

//Login
const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    if (!isValid) {
      return res.status(404).json(errors);
    } else {
      const user = await User.findOne({ email: req.body.email }).select(
        "+mot_de_passe"
      );
      if (!user) {
        return res.status(404).json({ message: "Incorrect Email " });
      }

      cmp = await bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe);
      if (cmp) {
        const token = jwt.sign(
          {
            id: user._id,
            nom: user.nom,
            email: user.email,
            role: user.role,
          },
          process.env.TOKEN_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          message: "success",
          user: user,
          token: {
            type: "Bearer",
            value: token,
          },
        });
      } else {
        return res.status(404).json({ message: "Incorrect password " });
      }
    }
  } catch (err) {
    console.log(err);
  }
  // return res.status(500).json({ message: "Server error" });
};

//Register
const Register = async (req, res, role) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      User.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "Email exists";
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.mot_de_passe, 10); //hashed password
          req.body.mot_de_passe = hash;
          req.body.role = role;

          //Insert photo
          if (req.files) {
            //if a photo exists
            if (req.files.photo) {
              // photo = name of the input(frontend)

              //Use the name of the input field (i.e. "pdp") to retrieve the uploaded file
              let pdp = req.files.photo;
              //Use the mv() method to place the file in upload directory (i.e. "uploads")
              pdp.mv("./public/" + pdp.name);
              req.body.photo = pdp.name;
            }
          }
          const user = await User.create(req.body);
          const token = jwt.sign(
            {
              id: user._id,
              nom: user.nom,
              email: user.email,
              role: user.role,
            },
            process.env.TOKEN_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            message: "Inscription reussie",
            user: user,
            token: {
              type: "Bearer",
              value: token,
            },
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//Change password
const ChangePassword = async (req, res) => {
  const id = req.params.id;
  const _User = await User.findById(id).select("+mot_de_passe");
  if (_User) {
    old_mdp = req.body.mot_de_passe;
    new_mdp = req.body.new_mot_de_passe;
    if (await bcrypt.compare(old_mdp, _User.mot_de_passe)) {
      _User.mot_de_passe = await bcrypt.hash(new_mdp, 10);
      await User.findByIdAndUpdate(id, _User);
      res.json("mot de passe modifié avec succés");
    } else {
      res.status(400).json("Meme mot de passe");
    }
  } else {
    res.json("User non trouvé");
  }
};

module.exports = {
  Login,
  Register,
  ChangePassword,
};
