const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('./../views/index.html');
});

router.get('/about',(req,res)=>{
    res.render('about');
});

router.get('/test',(req,res)=>{
    res.json({status:'Connexion établié CHIDO WE 4'});
})

module.exports = router;