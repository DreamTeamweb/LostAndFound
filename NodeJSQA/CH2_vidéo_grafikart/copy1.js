//lecture écriture d'un fichier avec un stream : pipe entre read et write
let fs = require('fs')
let file ="démo.mp4"

fs.stat(file, (err, stat)=>{
    let total = stat.size
    let progress = 0
    let read = fs.createReadStream(file)
    let write = fs.createWriteStream('copy.mp4')
    let write2 = fs.createWriteStream('copy2.mp4')
    read.on('data', (chunk)=>{
        progress += chunk.length
        console.log("J'ai lu "+Math.round((progress/total)*100)+"%")
    })
    read.pipe(write)
    read.pipe(write2)
    write.on('finish',()=>{
        console.log('Le fichier a bien été copié')
    })
    write2.on('finish',()=>{
        console.log('Le deuxième fichier est bien copié aussi')
    })
})
 

