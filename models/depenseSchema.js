const mongoose = require('mongoose');

const DepenseSchema = mongoose.Schema({
    
    type: {
        type: String,
        enum : ['Bureau','Salaires','Leasing','Maintenance','Autres'],
        require: true
    },
    date_depense:{
        type: Date,
        require:true
    },
    montant: {
        type: Number,
        require:true
    },
    // agence reference
    agence:
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agence",
},
},//end of schema
 {
    timestamps: true
})

const Depense = mongoose.model('Depense', DepenseSchema);
module.exports = Depense;