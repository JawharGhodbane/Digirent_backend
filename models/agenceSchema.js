const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agenceSchema = new Schema(
    {
        nom_agence: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        num_tel: {
            type: String,
            required:true
        },
    },//fermeture du schema
        {
            timestamps: true,
          }
        
);

const Agence = mongoose.model('Agence', agenceSchema);
module.exports = Agence;