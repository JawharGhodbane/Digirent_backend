module.exports = (c,u) => {
    const today = new Date();
    let photos = [];
    Object.values(c.voiture.photo).map((photo) => {
        photos.push(`<img src="http://localhost:3001/${photo}" alt="imgVoiture" height="400" width="700"/>`);
    })
    return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Contrat</title>
    
   </head>
   <body style="font-weight: bold;">
    <h1 style="text-align: center;">Contrat de location de voiture</h1>
       <div style="background-color:#D9D9D9">
        <p>Date: ${`${today.getDate()}/ ${today.getMonth() + 1}/ ${today.getFullYear()}`}</p>
        <p>Pays: Tunis</p>
       </div>
       <div style="background-color: #D9D9D9;">
        <h1>Agence</h1>
        <hr></hr>
        <p>Nom: ${c.voiture.agence.nom_agence}</p>
        <p> Localisation: ${c.voiture.agence.adresse}</p>
        <p>Numero de telephone: ${c.voiture.agence.num_tel}</p>
        <p> Agent responsable sur cette location: ${u.nom}</p>
        <p> Role de l'agent responsable: ${u.role}</p>
        <p>Adresse electronique de l'agent responsable: ${u.email}</p>
        
        </div>
        <div style="background-color: #D9D9D9">
            <h1>Location</h1>
            <hr></hr>
             <p>Nom et prenom du locataire: ${c.locataire}</p>
             <p> Adresse electronique du locataire: ${c.email_locataire}</p>
             <p>Date de debut de location: ${c.date_debut}</p>
             <p>Date de fin de location: ${c.date_fin}</p>
             <p>Prix: ${c.prix} Dt (Dinar Tunisien)</p>
        </div>
        <div style="background-color: #D9D9D9">
            <h1>Voiture</h1>
            <hr></hr>
             <p>Immatriculation: ${c.voiture.immatriculation}</p>
             <p>Numero de sachis: ${c.voiture.num_chasis}</p>
             <p>Marque: ${c.voiture.marque}</p>
             <p>Modele: ${c.voiture.modele}</p>
             <p>Kilometrage: ${c.voiture.kilometrage}</p>
             <p>Energie: ${c.voiture.energie}</p>
             <p>Nombre de cheveaux fiscale: ${c.voiture.nbr_chevaux}</p>

             <h3> Photos de la voiture louée (4 faces) : </h3>
             <div>
             ${ photos.join(' ') }
          </div>
        </div>
   </body>
</html>
    `;//endf return
};