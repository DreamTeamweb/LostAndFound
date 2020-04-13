const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const {isAuthenticated } = require('../helpers/auth');


router.get('/notes/add',isAuthenticated,(req,res)=>{//The seconds parameter verifies if the user is Athenticated
    res.render('notes/new-note');
});

router.post('/notes/new-note',isAuthenticated,async(req,res)=>{
    console.log(req.body);
    const {title,description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text:'Please write a title asshole'});
    }
    if(!description){
        errors.push({text:'Please write a description asshole'});
    }
    if(errors.length>0){
        res.render('notes/new-note',{
           errors,
           title,
           description 
        });
    }else{
        const newNote = new Note({title,description});
        newNote.user = req.user.id;
        await newNote.save();//Asynchronus process, to wait until the task be finished
        req.flash('success_msg','Note added successflly');
        res.redirect('/notes');
    }
});

router.get('/notes',isAuthenticated,async(req,res)=>{
    const notes = await Note.find({user:req.user.id}).sort({date:'desc'});
    res.render('notes/all-notes',{notes});//Render takes the main HTML/CSS tenplates

});

router.get('/notes/edit/:id',isAuthenticated, async (req, res)=>{
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note',{note});
});

router.put('/notes/edit-note/:id',isAuthenticated ,async(req,res)=>{
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Note updated successflly');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated,async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note deleted successflly');
    res.redirect('/notes');
});

module.exports = router;