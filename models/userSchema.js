const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        nom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        num_tel: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        mot_de_passe: {
            type: String,
            required: true,
            select: false
        },
        new_mot_de_passe: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: false
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

const User = mongoose.model('User', userSchema);
module.exports = User;