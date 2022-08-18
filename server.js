require('dotenv').config();
require("./config/db").connect();
const express = require('express');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodayParser = require('body-parser');
const passport = require('passport');

//declare routes
var agenceRoutes = require('./routes/agence.route');
var authRoutes = require('./routes/auth.route');
var chefRoutes = require('./routes/chef.route');
var employeRoutes = require('./routes/employe.route');
var VoitureRoutes = require('./routes/voiture.route');
var reservationRoutes = require('./routes/reservation.route');
var messageRoutes = require('./routes/msg.route');
var depenseRoutes = require('./routes/depense.route');
var statRoutes = require('./routes/stats.route');
var contratRoutes = require('./routes/contrat.route');
var AbonnementRoutes = require('./routes/abonnement.route');
//Intiailzie app with express
const app = express();
//---------------- Middlewares ----------------//
//CROS MW
app.use(cors());
//Body Parser MW
app.use(fileUpload({
  createParentPath: true
}));
app.use(bodayParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Static public folder
app.use(express.static(path.join(__dirname, 'public')));

//passport
app.use(passport.initialize());
// My routes
app.use('/', authRoutes);
app.use('/agences', agenceRoutes);
app.use('/chefs', chefRoutes);
app.use('/employes', employeRoutes);
app.use('/voitures', VoitureRoutes);
app.use('/reservations', reservationRoutes);
app.use('/messages',messageRoutes);
app.use('/depenses',depenseRoutes);
app.use('/stats',statRoutes);
app.use('/contrats',contratRoutes);
app.use('/paiement',AbonnementRoutes)

//Start the server
app.listen(process.env.PORT, () => {
  console.log('Express Server Started');
});