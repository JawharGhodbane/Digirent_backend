const User = require('../models/userSchema');
const Voiture = require('../models/voitureSchema');
const Depense = require('../models/depenseSchema');
const Contrat = require('../models/contratSchema');
const ObjectId = require('mongoose').Types.ObjectId;

// Nbr total de voitures
const NbrTotVoiture = async (req ,res)=>{
    try {
        nbv = await Voiture.count({agence:req.user.agence});
        res.status(200).json("Le nombre total de voiture : "+nbv);
    
     } catch (error) {
         res.status(404).json(error.message)
     }
};

//nbr de voiture disponible
const NbrVoitureDispo = async (req ,res)=>{
    try {
        nbvd = await Voiture.count({disponible:'oui'});
        res.status(200).json("Le nombre de voiture disponible est : "+nbvd);
    
     } catch (error) {
         res.status(404).json(error.message)
     }
};

//nbr de voiture non disponible 
const NbrVoitureNonDispo = async (req ,res)=>{
    try {
        nbvn = await Voiture.count({disponible:'non'});
        res.status(200).json("Le nombre de voiture non disponible est : "+nbvn);
    
     } catch (error) {
         res.status(404).json(error.message)
     }
};

//nbr d'employés
const NbrEmp = async (req ,res)=>{
    try {
      const nbe =  await User.count({role:"EMPLOYE",agence:req.user.agence}).populate('agence', ["nom_agence"]);
      res.status(200).json("le nombre d employés est : "+nbe);
  
   } catch (error) {
       res.status(404).json(error.message)
   }
  };

  // total de dépenses
  const totalDepenses = async (req ,res)=>{
    try {
        let tot=0;
      const data =  await Depense.find({agence:req.user.agence}).select("+montant");
      for (var i = 0; i < data.length; i++) {
        tot = tot+data[i].montant;
      }
      res.status(200).json("le montant total de depenses est:"+tot);
   } catch (error) {
       res.status(404).json(error.message)
   }
  };

  //total des revenus
  const totalRevenus = async (req ,res)=>{
    try {
        let rev=0;
      const data =  await Contrat.find({'voiture.agence':req.user.agence})
      for (var i = 0; i < data.length; i++) {
        rev = rev+data[i].prix;
      }
      res.status(200).json("le montant total de revenus est:"+rev);
   } catch (error) {
       res.status(404).json(error.message)
   }
  };

  const RevenusNet = async(req , res)=>{
    try {
        let tot=0;
        let rev=0;
      const data1 =  await Depense.find({agence:req.user.agence}).select("+montant");
      for (var i = 0; i < data1.length; i++) {
        tot = tot+data1[i].montant;
      }
      const data2 =  await Contrat.find({'voiture.agence':req.user.agence})
      for (var i = 0; i < data2.length; i++) {
        rev = rev+data2[i].prix;
      }
       net = rev-tot;
       res.status(200).json("Vos revenus net:"+net);

   } catch (error) {
       res.status(404).json(error.message)
   }

  }


module.exports = {
    NbrTotVoiture,
    NbrVoitureDispo,
    NbrVoitureNonDispo,
    NbrEmp,
    totalDepenses,
    totalRevenus,
    RevenusNet
}