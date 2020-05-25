const Objet = require('../models/Object');
const objectCtrl = {};
const path = require('path');
const fs = require('fs-extra');

objectCtrl.addObject = (req,res)=>{//The seconds parameter verifies if the user is Athenticated
    res.render('notes/new-note');
};

objectCtrl.createObject = async(req,res)=>{
    console.log(req.body);
    const {type,latitude,longitude,description,image}=req.body;
    const errors = [];
    if(!type){
        errors.push({text: "Le champ type est vide, complétez-le!"});
    } else if (type.length <= 0) {
        errors.push({ text: 'Quel est le type de l\'objet?' });
    } 
    
    if (!description){
        errors.push({text:"le champ description est vide, complétez-le!"});
    } else if(description.length<=0){
        errors.push({text:"veuillez entrer une description pour votre objet!"});
    } 
    
    if (errors.length>0){
        res.status(200).json({succes: false, message:errors});
    } else{
        const newObject = new Objet({type,latitude,longitude,description});
        if(req.file){
            const {path} = req.file.path;
            newObject.imagePath = req.file.path;
        }else{
            newObject.imagePath= false;//Pas de photo envoyée
        }
        
        newObject.user = req.user.id;
        await newObject.save();//Asynchronus process, to wait until the task be finished
        //req.flash('success_msg','Note added successflly');
        console.log(newObject);
        res.status(200).json({success:true, message:'Saved'});
    } 
    
};

objectCtrl.getAccess = (req,res)=>{
    res.status(200).json({success:true, message:'Logged'});
}

objectCtrl.getObjects = async(req,res)=>{
    //const notes = await Objet.find({user:req.user.id}).sort({date:'desc'});
    const objects = await Objet.find().sort({date:'desc'});
    res.status(200).json(objects);//Render takes the main HTML/CSS tenplates

};

objectCtrl.getUserObjects = async(req,res)=>{
    const objects = await Objet.find({user:req.user.id}).sort({date:'desc'});
    res.status(200).json(objects);//Render takes the main HTML/CSS tenplates

};

/*objectCtrl.getObject = async (req, res)=>{
    const object = await Objet.findById(req.params.id);
    res.render('notes/edit-note',{object});
};*/

objectCtrl.editObject = async(req,res)=>{
    const errors = [];
    const {type,latitude,longitude,description} = req.body;
    if (type.length <= 0) {
        errors.push({ text: 'Quel est le type de l\'objet?' });
    } 
    
    if (description.length<=0){
        errors.push({text:"veuillez entrer une description pour votre objet!"});
    } 
    
    if (errors.length>0){
        res.status(200).json({success:false, message: errors});
    } else{
        console.log(req.body);
        await Objet.findByIdAndUpdate(req.params.id,{type,latitude,longitude,description});
       // req.flash('success_msg','Objet updated successflly');
        res.status(200).json({succes:true,message: "Object updated"});
    }
};

objectCtrl.deleteObject = async (req,res)=>{
    const objet = await Objet.findByIdAndDelete(req.params.id);
    if(objet.imagePath != "false"){
        await fs.unlink(path.resolve(objet.imagePath));//Delete image
    }
    res.status(200).json({succes:true,message: "Object deleted"});
};

//Photos testing
objectCtrl.createPhoto = async(req,res)=>{
    const {type,latitude,longitude,description,user} = req.body;
    console.log(req.file);
    const newObject = new Objet({type,latitude,longitude,description,imagePath:req.file.path ,user});
    console.log('Saving photo');
    newObject.user = req.user.id;
    console.log(newObject)//guardar esto en la base de datos
    await newObject.save();
    res.status(200).json({success:true, message:'Photo successfully saved!'})
}


objectCtrl.getPhotos = async(req,res)=>{
    const objects = await Objet.find().sort({date:'desc'});
    res.json(objects);

}


module.exports = objectCtrl;