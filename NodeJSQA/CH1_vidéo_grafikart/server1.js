//programme type 'hello world'

console.log('salut')

//attente d'une requête à un server: problème avec seulement ça
//la page web qui charge localhost:8080 ne s'arrête pas de charger
//puisque le serveur ne lui dit rien
let http = require('http')
let server = http.createServer()
server.on('request',(request, response)=>{
    console.log("il y eu une requête")
})
server.listen(8080)
