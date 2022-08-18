const Reservation = require('../models/reservationSchema');
const Voiture = require('../models/voitureSchema');
const ObjectId = require('mongoose').Types.ObjectId;

// Add reservation
const AddRes = async (req ,res)=>{
   
    Reservation.findOne({voiture:req.body.voiture}).then(async(exist) => {
        if (exist) {
          res.status(404).json(" Désolé, cette voiture est déja résérvée");
        }else{
            

           var _reserv =
           {
                date_debut:new Date(req.body.date_debut),    
                date_fin:new Date(req.body.date_fin),
                locataire: req.body.locataire,
                email_locataire: req.body.email_locataire,
                voiture: req.body.voiture
            }
            //console.log(new Date("2022-01-28"))
            

    await Reservation.create(_reserv).then(async () => {
        //console.log(voit)
        await Voiture.findByIdAndUpdate(
            req.body.voiture,
            { disponible: 'non' },
            { new: true, useFindAndModify: false }
            ); 
         })

    res.status(200).json({ message: "reservation ajoutée avec sucées" });
        if (!res.status(200)) {res.send("Erreur d'ajout de la reservation");}
}
});
};

// DELETE Reservation
const DeleteRes = async (req ,res)=>{
  try {
    const data =  await Reservation.findOneAndRemove({_id: req.params.id})
    res.status(200).json({message: "résérvation anuulée avec succées"})

 } catch (error) {
     res.status(404).json(error.message)
 }
}

// UPDATE Reservation
const UpdateRes = async (req ,res)=>{

    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`Aucune voiture avec l'id : ${req.params.id}`);
    var _reserv =
           {
                date_debut:new Date(req.body.date_debut).toISOString().split('T')[0],    
                date_fin: new Date(req.body.date_fin),
                locataire: req.body.locataire,
                email_locataire: req.body.email_locataire,
                voiture: req.body.voiture
            }

    Reservation.findByIdAndUpdate(req.params.id, { $set: _reserv }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Erreur de mise à jour de la résérvation :' + JSON.stringify(err, undefined,2)); }
    });
};

//get by ID
const GetOneRes = async (req ,res)=>{
try {
    const data =  await Reservation.findById(req.params.id).populate({
        path: 'voiture',
        model: 'Voiture',
        populate: {
            path: 'agence',
            model: 'Agence'
        }
        });
    res.status(200).json(data)

 } catch (error) {
     res.status(404).json(error.message)
 }
};

//GET ALL 
const GetAllRes = async (req ,res)=>{
  try {

    const data =  await Reservation.find({'voiture.agence':req.user.agence}).populate("voiture");
       /* path: 'voiture',
        populate: {
            path: 'agence',
        }
        });*/
    res.status(200).json(data)

 } catch (error) {
     res.status(404).json(error.message)
 }
};

module.exports = {
    AddRes,
    DeleteRes,
    GetOneRes,
    GetAllRes,
    UpdateRes
}