const Message = require('../models/msgSchema');

// Send Message
const SendMessage = async (req ,res)=>{
   
    try {
        const sendMsg = new Message({
          nom: req.body.nom,
          email: req.body.email,
          message: req.body.message,
        });

        const created = await sendMsg.save();
        res.status(200).json("Votre message est envoyé avec succés");
      } catch (error) {
        res.status(400).json(error);
      }
    };

  module.exports = {
      SendMessage
    }