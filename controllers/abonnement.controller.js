const axios = require('axios')
const Abonnement = require('../models/abonnementSchema');

const PayMonth = async (req, res) => {
   
   const url = "https://developers.flouci.com/api/generate_payment"
   const payload ={
    "app_token": process.env.TOKEN_PUBLIC, 
    "app_secret": process.env.TOKEN_SECRET,
    "amount": "80000",
    "accept_card": "true",
    "session_timeout_secs": 1200,
    "success_link": "http://localhost:3000/success",
    "fail_link": "http://localhost:3000/fail",
    "developer_tracking_id": "893ff2cd-abee-45ca-9f79-62e1d60581ff"
   }

 
   await axios
        .post(url,payload)
        .then(result =>{
             res.send(result.data)
             const ab = new Abonnement({ user:'jawhar',type_abon:"OneMonth"});
               ab.save();
                   })
        .catch(err => res.send(err));

}

const PaySixMonth = async (req, res) => {
   
   const url = "https://developers.flouci.com/api/generate_payment"
   const payload ={
    "app_token": process.env.TOKEN_PUBLIC,
    "app_secret": process.env.TOKEN_SECRET,
    "amount": "450000",
    "accept_card": "true",
    "session_timeout_secs": 1200,
    "success_link": "http://localhost:3000/success",
    "fail_link": "http://localhost:3000/fail",
    "developer_tracking_id": "893ff2cd-abee-45ca-9f79-62e1d60581ff"
   }
   await axios
        .post(url,payload)
        .then(result =>{
             res.send(result.data)
         })
        .catch(err => res.send(err));
}

const PayYear = async (req, res) => {
   
    const url = "https://developers.flouci.com/api/generate_payment"
    const payload ={
     "app_token": process.env.TOKEN_PUBLIC,
     "app_secret": process.env.TOKEN_SECRET,
     "amount": "450000",
     "accept_card": "true",
     "session_timeout_secs": 1200,
     "success_link": "http://localhost:3000/success",
     "fail_link": "http://localhost:3000/fail",
     "developer_tracking_id": "893ff2cd-abee-45ca-9f79-62e1d60581ff"
    }
    await axios
         .post(url,payload)
         .then(result =>{
              res.send(result.data)
          })
         .catch(err => res.send(err));
 }

/*const VerifyPaiement = async(req,res) => {
    const id_paiement = req.params.id;
    const url = `https://developers.flouci.com/api/verify_payment/${id_paiement}`
    await axios
         .get(url,{
            headers : {
                'apppublic': process.env.TOKEN_PUBLIC,
                 'appsecret':process.env.TOKEN_SECRET
              }})
         .then(result =>{
              res.send(result.data)
          })
         .catch(err => res.send(err.message));
}*/


module.exports = {
    PayMonth,
    PaySixMonth,
    PayYear
   }