/*const http = require('http');
const server = http.createServer((req, res)=> {
    res.status = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(3000,()=>{
    console.log('Server on port 3000');

}); //Tout ca c'est juste en Node.js*/

//Express

//Pour l'utiliser:
// nom init -y (dans le projet du projet) un fichier qui décrit le projet
// npm install express (dans le dossier du projet)
//
const express = require('express');
const app = express();

app.use(express.json());//Utiliser le format JSON

app.get('/user',(req,res)=>{//Version résumée du code Node
    res.json({
        username: 'Cameron',
        lastname: "Howe"
    });
});//Quand on ait une demande (get) on va répondre avec ce code

app.post('/user/:id',(req,res )=>{//Resquest parameter (id)
    console.log(req.body);
    console.log(req.params);//To obteins the parameters
    res.send('POST REQUEST RECEIVED');
});

app.put('/user/:id',(req,res )=>{
    console.log(req.body);//Where to modify
    res.send(`User ${req.params.id} user updated`);//New value
});

app.delete('/user/:usrId',(req,res )=>{
    res.send(`User ${req.params.usrId} has been deleted`);
});

app.get('/test',(req,res )=>{
    res.send('<h1>Using NODEMON</h1>');
});

app.listen(3000,()=>{
    console.log("Sever on port 3000");
});

//installer nodemon (faciliter le developpement de l'application) 
//il est l'écoute de on code js. A chaque modification nous évite de reéxecuter le programme (server).
// npm i nodemon -D

//Pour l'utiliser dans un fichier on tape:
//npx nodemon nom_fichier.js