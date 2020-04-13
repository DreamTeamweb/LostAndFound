///////////// Framework de mongoose
var mongoose = require('mongoose');
// Connection a une base de donnée
mongoose.connect('mongodb://localhost/projet',{ useNewUrlParser: true, useUnifiedTopology: true }, function(err) { if (err) { throw err; } });

///////////// Création des schémas pour les collections

var objet_trouve_Schema = new mongoose.Schema({
  pseudo : String,
  contenu : String,
  date : { type : Date, default : Date.now }
});

var objet_perdu_Schema = new mongoose.Schema({
  pseudo : String,
  contenu : String,
  date : { type : Date, default : Date.now }
});

///////////// Création du Model pour les commentaires

var Objet_perdu = mongoose.model('Objet_trouve', objet_trouve_Schema);      //ma collection s'appellera donc objet_trouve et elle se base sur le schéma

/////////// Recupération de toute la base de données

var query = Objet_perdu.find(null);            // Les données sont retournés sur la forme "query". Une description de query est disponible dans le fichie trash.

//////////// On crée une instance du Model

var monCommentaire = new Objet_perdu({ pseudo : 'Atinux' });                //Creation d'une instance/nouvel objets
monCommentaire.contenu = "Salut je suis amoureux de Mathilde ";

//////////////////////////////////////////////// Partie Fonction ///////////////////////////////////////////////////////////////

/////////// On le sauvegarde dans la base de donnée MongoDB ! On fait une fonction parceque nous savons coder.

function sauvegardeObjet(objet){
    objet.save(function (err) {
        if (err) { throw err; }
        console.log('Commentaire ajouté avec succès !');
    });
};
//sauvegardeObjet(monCommentaire);

////////// Fonction affichage à implémenter avec une description plus avançée

function affichage(collection){
    collection.exec(function (err, comms) {
    console.log('******************************');
    console.log("Début de l'affichage d'une collection ");
    console.log('------------------------------');
      if (err) { throw err; }
      var comm;
      for (var i = 0, l = comms.length; i < l; i++) {
        comm = comms[i];
        console.log('------------------------------');
        console.log('Pseudo : ' + comm.pseudo);
        console.log('Commentaire : ' + comm.contenu);
        console.log('Date : ' + comm.date);
        console.log('ID : ' + comm._id);
        console.log('------------------------------');
      }
    //mongoose.connection.close();
    console.log('------------------------------');
    console.log('Fin de la dbs ');
    console.log('******************************');
    });
}
//affichage(query);

///////// Recherche en fonction d'un paramètre
// les champs sont: {pseudo, contenu, date}.
// La recherche par champs fonctionne.

function recherche(collection, champs, objet){
    console.log('Début de recherche ciblé');
    collection.where(champs, objet);
    affichage(collection);
    };
//recherche(query, "pseudo" ,"Nikita");
//recherche(query,"contenu","Salut j ai trouve un pot de fleur !" );

///////// Recherche par mot clefs

function recherche_Mot_Clef(collection,mot){
    collection.exec(function (err, comms) { if (err) { throw err; }
      var comm;
      var index = 0;
      console.log('******************************');
      console.log('Début de la recherche par mot clef');

      for (var i = 0, l = comms.length; i < l; i++) {
        comm = comms[i];
        var chaine = comm.contenu;
        var position = chaine.search(mot);
        if(position != -1){
            console.log('------------------------------');
            console.log('Ceci est le résultat d une recherche par mot clefs');
            console.log('Pseudo : ' + comm.pseudo);
            console.log('Commentaire : ' + comm.contenu);
            console.log('Date : ' + comm.date);
            console.log('ID : ' + comm._id);
            console.log('------------------------------');
            index +=1;
        }
      }

    if(index == 0){console.log("Aucun élément ne correspond à votre recherche. le mot clef étant", mot)}
    else{console.log("Nous avons identifié ",index," éléments qui correspondent à votre recherche.")}
    //console.log('------------------------------');
    console.log('Fin de la recherche par mot clef');
    console.log('******************************');

    });
}
//recherche_Mot_Clef(query," Mathildeuu");

///////// Fonction Suppression élément. En cours.

function supression(collection, champs, objet){
    console.log('******************************');
    console.log('Début de la supression ');
    collection.where(champs, objet);
    collection.deleteOne({ champs : objet }, function (err) { if (err) { throw err; }});
    console.log("Commentaires avec", champs," équivalent à ", objet," ont été supprimé !");
    console.log('******************************');
}
//supression(query, "pseudo" ,"Atinux");

//////// Fonction Fermeture de la connexion.

 function fermeture(){ setTimeout(function(){ mongoose.connection.close(); console.log("Fermeture de la connection à la base de donnée ");}, 3000);}
fermeture();

//////////////////////////////////////////////////////////////// Le main /////////////////////////////////////////


let b = document.body;
let newP = document.createElement('p');
let newTexte = document.createTextNode('Texte écrit en JavaScript');

//newP.textContent = 'Paragraphe créé et inséré grâce au JavaScript';

//Ajoute le paragraphe créé comme premier enfant de l'élément body
//b.prepend(newP);

/////// Doit retourner un string à afficher par la page HTML


function giveVar(collection){
    collection.exec(function (err, comms) {
    saut = "\n";
    var aff = "";
    aff = aff + "****************************** " + saut ;
    aff = aff + "Début de l'affichage d'une collection "+ saut;
    aff = aff + "------------------------------";
      if (err) { throw err; }
      var comm;
      for (var i = 0, l = comms.length; i < l; i++) {
        comm = comms[i];
        aff = aff + "------------------------------" + saut;
        aff = aff + "Pseudo : " + comm.pseudo + saut;
        aff = aff + "Commentaire : " + comm.contenu + saut;
        aff = aff + "Date : " + comm.date + saut;
        aff = aff + "ID : " + comm._id + saut;
        aff = aff + "------------------------------" + saut;
      }

    aff = aff + "------------------------------" + saut;
    aff = aff + "Fin de la dbs " + saut;
    aff = aff + "******************************" + saut;
    //console.log(aff);
    newP.textContent = aff ;
    b.prepend(newP);
    });

}
newP.textContent = "test numero 4 " ;
b.prepend(newP);

giveVar(query);

