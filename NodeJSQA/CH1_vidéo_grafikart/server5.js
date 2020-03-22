//server qui lit un .html et l'affiche sur le site et qui récupère
//des paramètres passé en url.
let http = require('http')
let fs = require('fs')
let url = require('url')

let server = http.createServer()
server.on('request',(request, response)=> {
    response.writeHead(200)
    let query = url.parse(request.url, true).query    
    let name = query.name === undefined ? 'anonyme': query.name
    fs.readFile('index.html','utf8',(err, data)=>{
        if (err){
            response.writeHead(404)
            response.end("Ce fichier n'existe pas")
        } else {
            response.writeHead(200, {
                'Content-type':'text/html; charset=utf-8'
            })
            data = data.replace('{{ name }}', name)
            response.end(data)
        }
    })
})
server.listen(8080)