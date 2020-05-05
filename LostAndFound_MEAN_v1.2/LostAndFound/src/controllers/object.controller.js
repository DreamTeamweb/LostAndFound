const Objet = require('../models/Object');
const objectCtrl = {};


objectCtrl.addObject = (req,res)=>{//The seconds parameter verifies if the user is Athenticated
    res.render('notes/new-note');
};

objectCtrl.createObject = async(req,res)=>{
    console.log(req.body);
    const {type,location,description}=req.body;
    const newObject = new Objet({type,location,description});
    newObject.user = req.user.id;
    await newObject.save();//Asynchronus process, to wait until the task be finished
    //req.flash('success_msg','Note added successflly');
    console.log(newObject);
    res.status(200).json({status:'guardado'});
};

objectCtrl.getAccess = (req,res)=>{
    res.status(200).json({status:'Logged'});
}

objectCtrl.getObjects = async(req,res)=>{
    //const notes = await Objet.find({user:req.user.id}).sort({date:'desc'});
    const objects = await Objet.find().sort({date:'desc'});
    res.json(objects);//Render takes the main HTML/CSS tenplates

};

objectCtrl.getUserObjects = async(req,res)=>{
    const objects = await Objet.find({user:req.user.id}).sort({date:'desc'});
    res.status(200).json(objects);//Render takes the main HTML/CSS tenplates

};

objectCtrl.getObject = async (req, res)=>{
    const object = await Objet.findById(req.params.id);
    res.render('notes/edit-note',{object});
};

objectCtrl.editObject = async(req,res)=>{
    const {type,location,description} = req.body;
    console.log(req.body);
    await Objet.findByIdAndUpdate(req.params.id,{type,location,description});
    req.flash('success_msg','Objet updated successflly');
    res.status(200).json({status:'Objet modifié'});
};

objectCtrl.deleteObject = async (req,res)=>{
    await Objet.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note deleted successflly');
    res.status(200).json({status:'Objet suprimé'});
};

module.exports = objectCtrl;