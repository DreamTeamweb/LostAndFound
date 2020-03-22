//2nd exemple une fois que la requête est faite
//le server renvoie une chaine de caractère

let http = require('http')
let server = http.createServer()
server.on('request',(request, response)=> {
    response.writeHead(200, {
        'Content-type':'text/html; charset=utf-8'
    })
    response.end('Salut, comment ça va?')
})
server.listen(8080)