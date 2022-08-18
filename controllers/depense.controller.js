const Depense = require('../models/depenseSchema');
const ObjectId = require('mongoose').Types.ObjectId;


// Add depense
const AddDepense = async (req ,res)=>{

    req.body.agence = req.user.agence;
    await Depense.create(req.body);
    res.status(200).json({ message: "depense ajoutée avec sucées" });
        if (!res.status(200)) {res.send("Erreur d'ajout de la depense");}
}

// DELETE depense
const DeleteDepense = async (req ,res)=>{
  try {
    const data =  await Depense.findOneAndRemove({_id: req.params.id})
    res.status(200).json({message: "depense supprimée avec suucés"})

 } catch (error) {
     res.status(404).json(error.message)
 }
}

// UPDATE depense
const UpdateDepense = async (req ,res)=>{

    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Aucune Depense avec l'id : ${req.params.id}`);


    var _dep = //req.body;
    {
        type: req.body.type,
        date_depense:new Date(req.body.date_depense),
        montant: req.body.montant,
        };

    Depense.findByIdAndUpdate(req.params.id, { $set: _dep }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur depense update :' + JSON.stringify(err, undefined,2)); }
    });
};

//get by ID
const GetOneDepense = async (req ,res)=>{
    try {
        const data =  await Depense.findById(req.params.id).populate('agence', ["nom_agence"]);
        res.status(200).json(data)
    
     } catch (error) {
         res.status(404).json(error.message)
     }
};

//GET ALL for each chef or employe
const GetDepenses = async (req ,res)=>{
  try {
    const data =  await Depense.find({agence:req.user.agence}).populate('agence', ["nom_agence"]);
    res.status(200).json(data)

 } catch (error) {
     res.status(404).json(error.message)
 }
};

module.exports = {
    AddDepense,
    DeleteDepense,
    GetDepenses,
    GetOneDepense,
    UpdateDepense
}