//première méthode peu efficace de lecture/écriture de fichier
//data stocke tout le fichier lu et écrit tout ensuite
//On doit attendre que tout le fichier ait été lu avant d'évrire 
//la copie.
let fs = require('fs')

fs.readFile('démo.mp4',(err,data) =>{
    if(err) throw err
    fs.writeFile('copy.mp4', data, (err)=>{
        if (err) throw err
        console.log('Le fichier a bien été copié')
    })
})