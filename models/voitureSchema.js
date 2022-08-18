const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voitureSchema = new Schema(
    {
        immatriculation: {
            type: String,
            required: true
        },
        num_chasis: {
            type: String,
            required: true
        },
        nbr_chevaux: {
            type: String,
            required: true
        },
        modele: {
            type: String,
            required: true
        },
        marque: {
            type: String,
            required: true
        },
        kilometrage: {
            type: Number,
            required: true
        },
        energie: {
            type: String,
            required: true
        },
        photo:{
            type: [String],
            required: false
        },
        disponible:{
            type: String,
            enum : ['oui','non'],
            default:'oui'
        },
           // Agence reference
           agence:
           {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Agence",
       },
        
    },//fermeture du schema
    {
        timestamps: true,
      }
    
);

const Voiture = mongoose.model('Voiture', voitureSchema);
module.exports = Voiture;