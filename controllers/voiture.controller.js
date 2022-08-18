const Voiture = require("../models/voitureSchema");
const ObjectId = require("mongoose").Types.ObjectId;

// Add voiture
const AddVoiture = async (req, res) => {
  Voiture.findOne({ num_chasis: req.body.num_chasis }).then(async (exist) => {
    if (exist) {
      res.status(404).send(" voiture existe");
    } else {
      //req.body.agence = req.user.agence;
      const v = {
        immatriculation: req.body.immatriculation,
        num_chasis: req.body.num_chasis,
        nbr_chevaux: req.body.nbr_chevaux,
        modele: req.body.modele,
        marque: req.body.marque,
        kilometrage: req.body.kilometrage,
        energie: req.body.energie,
        agence:req.user.agence
      };
      await Voiture.create(v);

      //Insert photo
      if (req.files) {
        //if a photo exists
        if (req.files.photo) {
          // voiturePhoto = name of the input(frontend)
          //console.log(req.files.photo)
          const voiturePhotos = req.files.photo;

          for (const p of voiturePhotos) {
            //console.log(p.name);
            //console.log(v)
            
            p.mv('./public/' + p.name);
            await Voiture.findOneAndUpdate(v, { $push: { photo: p.name } });//end  of UPDATE
          }
        }
      }
      res.status(200).json({ message: "voiture ajoutée avec sucées" });
      if (!res.status(200)) {
        res.send("Erreur d'ajout de la voiture");
      }
    }
  });
};

// DELETE voiture
const DeleteVoiture = async (req, res) => {
  try {
    const data = await Voiture.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// UPDATE Voiture
const UpdateVoiture = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Aucune voiture avec l'id : ${req.params.id}`);
  const v = 
    {
        immatriculation: req.body.immatriculation,
        num_chasis: req.body.num_chasis,
        nbr_chevaux: req.body.nbr_chevaux,
        modele: req.body.modele,
        marque: req.body.marque,
        kilometrage: req.body.kilometrage,
        energie: req.body.energie,
    };
    Voiture.findByIdAndUpdate(
        req.params.id,
        { $set: v },
        { new: true },
        (err, doc) => {
          if (!err) {
            res.json("Voiture modifié avec succés");
          } else {
            console.log(
              "Erreur voiture update :" + JSON.stringify(err, undefined, 2)
            );
          }
        }
      );
  //Insert photo
  if (req.files) {
    //if a photo exists
    if (req.files.photo) {
      // voiturePhoto = name of the input(frontend)
      //console.log(req.files.photo)
      const voiturePhotos = req.files.photo;
      await Voiture.findOneAndUpdate(v, { $set: { photo:[]} }); //end  of UPDATE
      for (const p of voiturePhotos) {
        //console.log(p.name);
        //console.log(v)
        await Voiture.findOneAndUpdate(v, { $push: { photo:p.name} }); //end  of UPDATE
      }
    }
  }

 
};

//get by ID
const GetOneVoiture = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Aucun voiture avec l'id : ${req.params.id}`);

  Voiture.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send(
        "Erreur: aucun voiture trouvé :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

//GET ALL for each chef or employe
const GetVoitures = async (req, res) => {
  try {
    const data = await Voiture.find({ agence: req.user.agence }).populate(
      "agence",
      ["nom_agence"]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  AddVoiture,
  DeleteVoiture,
  GetOneVoiture,
  GetVoitures,
  UpdateVoiture,
};
