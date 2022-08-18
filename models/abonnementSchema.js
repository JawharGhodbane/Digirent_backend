const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const abonSchema = new Schema(
    {
       // user reference
        user:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        
        type_abon: {
            type: String,
            enum : ['Month','Six_Month','One_Year'],
            require: true
        },

        date_abon:{
            type:Date,
            require: true
        }

    },//fermeture du schema
    {
        timestamps: true,
    }

);

const Abon = mongoose.model('Abon', abonSchema);
module.exports = Abon;