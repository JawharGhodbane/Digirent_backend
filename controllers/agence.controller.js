const Agence = require('../models/agenceSchema');
const User = require('../models/userSchema');
const ObjectId = require('mongoose').Types.ObjectId;


const AddAgence = async (req, res) => {
    const _agence = new Agence(req.body);

    Agence.create(_agence).then(async (user_agence) => {
        //console.log("\n>> Created Agence:\n", user_agence);
        //console.log("\n>>here rec");
        await User.findByIdAndUpdate(
            req.user._id,
            { agence: user_agence._id },
            { new: true, useFindAndModify: false }
        );
        res.send(user_agence);
    })
        .catch((err) => {
            res.status(400).send(err);
        });
}

//DELETE agence
const DeleteAgence = async (req, res) => {
    try {
        const data = await Agence.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "agence deleted" })

    } catch (error) {
        res.status(404).json(error.message)
    }
};

//UPDATE agence
const UpdateAgence = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var _agence = //req.body;
    {
        nom_agence: req.body.nom_agence,
        adresse: req.body.adresse,
        num_tel: req.body.num_tel
    };

    Agence.findByIdAndUpdate(req.params.id, { $set: _agence }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in agence Update :' + JSON.stringify(err, undefined, 2)); }
    });
};

//get by ID
const GetAgence = async (req, res) => {
    /* if (!ObjectId.isValid(req.params.id))
         return res.status(400).send(`No record with given id : ${req.params.id}`);*/

    Agence.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Retriving agence :' + JSON.stringify(err, undefined, 2)); }
    });
};

//GET ALL
const GetAgences = async (req, res) => {
    try {
        const data = await Agence.find()
        res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}


module.exports = {
    AddAgence,
    DeleteAgence,
    GetAgence,
    GetAgences,
    UpdateAgence
}