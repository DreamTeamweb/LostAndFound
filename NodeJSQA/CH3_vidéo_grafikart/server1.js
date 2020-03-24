let _ = require('lodash')

console.log(_.map([1, 2, 3], function(n){return n * 3;}))

let app = require('./app').start(8080)
app.on('root', function(response){
    response.write('Je suis à la racine')

})

