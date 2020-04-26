const Objet = require('../models/Object');
const objectCtrl = {};


objectCtrl.addObject = (req,res)=>{//The seconds parameter verifies if the user is Athenticated
    res.render('notes/new-note');
};

objectCtrl.createObject = async(req,res)=>{
    console.log(req.body);
    const {type,location,description}=req.body;
    const newObject = new Objet({type,location,description});
    await newObject.save();//Asynchronus process, to wait until the task be finished
    //req.flash('success_msg','Note added successflly');
    console.log(newObject);
    res.json({'status':'guardado'});
};


objectCtrl.getObjects = async(req,res)=>{
    //const notes = await Objet.find({user:req.user.id}).sort({date:'desc'});
    const objects = await Objet.find().sort({date:'desc'});
    res.json(objects);//Render takes the main HTML/CSS tenplates

};


objectCtrl.getObject = async (req, res)=>{
    const note = await Objet.findById(req.params.id);
    res.render('notes/edit-note',{note});
};

objectCtrl.editObject = async(req,res)=>{
    const {title,description} = req.body;
    await Objet.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Note updated successflly');
    res.redirect('/notes');
};

objectCtrl.deleteObject = async (req,res)=>{
    await Objet.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note deleted successflly');
    res.redirect('/notes');
};

module.exports = objectCtrl;