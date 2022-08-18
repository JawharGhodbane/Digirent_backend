const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MongooseFindByReference } = require('mongoose-find-by-reference');

const reservationSchema = new Schema(
    {
        date_debut: {
            type: Date,
            required: true
        },
        date_fin: {
            type: Date,
            required: true
        },
        locataire: {
            type: String,
            required: true
        },
        
        email_locataire: {
            type: String,
            required: true
        },
        // voiture reference
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

reservationSchema.plugin(MongooseFindByReference);
const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;