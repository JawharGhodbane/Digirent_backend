const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MongooseFindByReference } = require('mongoose-find-by-reference');

const contratSchema = new Schema(
    {
        locataire: {
            type: String,
            required: true
        },
        email_locataire: {
            type: String,
            required: true
        },
        prix: {
            type: Number,
            required: true
        },
        date_debut: {
            type: Date,
            required: true
        },
        date_fin: {
            type: Date,
            required: true
        },
           // Voiture reference
           voiture:
           {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Voiture",
       },
        
    },//fermeture du schema
    {
        timestamps: true,
      }
    
);

contratSchema.plugin(MongooseFindByReference);
const Contrat = mongoose.model('Contrat', contratSchema);
module.exports = Contrat;