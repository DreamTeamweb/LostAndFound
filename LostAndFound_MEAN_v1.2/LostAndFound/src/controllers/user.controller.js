const User = require('../models/User');
const userCtrl ={};


/*router.get('/users/signin',(req,res)=>{
    res.render('users/signin')
});*/

/*router.post('/users/signin',passport.authenticate('local',{
    successRedirect:'/notes',//Good
    failureRedirect:'/users/signin',//Bad identifiers
    failureFlash: true
}));//Executes the whole function writen in passport.js

router.get('/users/signup', (req,res)=>{
    res.render('users/signup')
});*/

userCtrl.createUser = async (req,res)=>{
    console.log(req.body);
    const {name,lastname,email,number,password,confirm_password} =req.body;
    const errors = [];
    console.log('Ya quedo '+confirm_password);
    if(name.length <= 0){
        errors.push({text:'Inserez votre prénom'});
    }

    if(lastname.length <= 0){
        errors.push({text:'Inserez votre nom'});
    }

    if(email.length <= 0){
        errors.push({text:"Inserez votre mail de l'INSA"});
    }

    if(number.length <= 0){
        errors.push({text:'Inserez votre numéro de téléphone'});
    }

    if(password.length <= 0){
        errors.push({text:'Inserez un mot de passe'});
    }else{
        if(password.length < 4){
            errors.push({text: "Le mot de passe doit être compossé d'au moins 4 lettres"});
        }
    }
    if(confirm_password.length <= 0){
        errors.push({text:'Confirmez votre mot de passe'});
    }

    if(password != confirm_password){
        errors.push({text: 'Les mots de passe ne correspondent pas'});
    }

    if(errors.length > 0){
        res.status(500).json(errors);
    }else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            console.log("Ya existe");
            errors.push({text:"Mail already in use"});
            //req.flash('error_msg','The email is already in use');
            res.status(400).send({message: 'email used'});
        }else{
        const newUser = new User({name,lastname,email,number,password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        //req.flash('success_msg',"Vous venez d'être inscrit");
        res.status(201).json(newUser);
    }
    }
};


userCtrl.LoginUser= (req,res)=>{
    console.log('Hola si salio'+req.body);
};

userCtrl.getUser = async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
};
/*router.get('/users/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});*/


userCtrl.editUser = async(req,res)=>{
    const {number} = req.body;
    console.log(req.body);
    await User.findByIdAndUpdate(req.params.id,{number});
    //req.flash('success_msg','Objet updated successflly');
    res.status(200).json({status:'User modifié'});
};

module.exports = userCtrl;