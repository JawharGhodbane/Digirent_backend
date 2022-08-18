const Contrat = require('../models/contratSchema');
const pdf = require('html-pdf');
const pdfTemplate = require('../Templates/contratTemplate');
const mailer = require('../middlewares/mailer.js');
const path = require('path');
var fs = require('fs');


// Add contrat
const AddContrat = async (req ,res)=>{

        Contrat.findOne({voiture:req.body.voiture}).then(async(exist) => {
            if (exist) {
              res.status(404).json(" Désolé, cette voiture est déja résérvée");
            }else{
                var _contrat = {
                    locataire:req.body.locataire,
                    email_locataire: req.body.email_locataire,
                    date_debut: req.body.date_debut,
                    date_fin: req.body.date_fin,
                    prix: req.body.prix,
                    voiture: req.body.voiture
                }

        const data =  Contrat.create(_contrat)
        res.status(200).json({message: "contrat ajouté avec succés"})
    }

    const c = await Contrat.findOne(_contrat).populate({
        path: 'voiture',
        populate: {
            path: 'agence',
        }
        });
         //console.log(c)
         pdf.create(pdfTemplate(c,req.user), {}).toFile(`./public/${req.body.locataire}.pdf`, (err) => {
            if(err) {
                res.send("ERREUR d'envoi du contrat");
            }
            else{
                //sendEmail
          fs.readFile(`./public/${_contrat.locataire}.pdf`, function (err, data) {
            mailer.sendMail({       
                from: process.env.USER,
                to: _contrat.email_locataire,
                subject: 'Agence Digirent : Contrat de location de voiture !',
                text: " Voila votre contrat ",
                attachments: [{'filename': `${_contrat.locataire}.pdf`, 'content': data}]
            })
        });
        }
        })    
});
}


//delete contrat
const DeleteContrat = async (req ,res)=>{
try{
 data = await Contrat.findByIdAndDelete(req.params.id)
 res.status(200).json({message:"Contrat supprimé avec succés"})

}catch(error){
    res.status(404).json(error.message)
}

}


//get contrats
const getContrats = async (req , res) => {
    try {

        const data =  await Contrat.find({'voiture.agence':req.user.agence}).populate("voiture");
           /* path: 'voiture',
            populate: {
                path: 'agence',
            }
            });*/
        res.status(200).json(data)
    
     } catch (error) {
         res.status(404).json(error.message)
     }
}

module.exports = {
    AddContrat,
    DeleteContrat,
    getContrats
}