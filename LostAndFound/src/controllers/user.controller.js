const User = require('../models/User');
const userCtrl = {};
const jwt = require('jsonwebtoken')
const mail = require('./../config/mail.js')
const secretKey = 'login'
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

userCtrl.createUser = async (req, res) => {
    console.log(req.body);
    const { name, lastname, email, number, password, confirmPassword } = req.body;
    const errors = [];
    if (!name){
        errors.push({text: "Le champ nom est vide, complétez-le!"});
    } else if(name.length <= 0) {
        errors.push({ text: 'Inserez votre prénom' });
    }

    if(!lastname){
        errors.push({text: "le champ nom est vide, complétez-le!"});
    } else if(lastname.length <= 0) {
        errors.push({ text: 'Inserez votre nom' });
    }
    
    if(!email){
        errors.push({text:"le champ email est vide, complétez-le!"});
    } else if(email.length <= 0) {
        errors.push({ text: "Inserez le début de votre mail de l'INSA" });
    }else if(email.includes("@")){
        errors.push({text: 'Ne mettez pas l\'extension de l\'adresse mail' });
    }

    //PARTIE VERIF NUMERO DE TEL
    var myRegex = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,9})$/;
    /*if (myRegex.test(number) == false) {
        console.log("erreur sur le numéro de tel",number)
        errors.push({text: "le numéro n'est pas valide"});
    }*/
    if(number){
        if (number.length > 25) {
            errors.push({text: "Le numéro est trop long"});
        }
    }

    
    if(!password){
        errors.push({text: "Le champ mot de passe est resté vide, complétez-le!"});
    } else if(password.length <= 0) {
        errors.push({ text: 'Inserez un mot de passe' });
    } else if (password.length < 4) {
        errors.push({ text: "Le mot de passe doit être composé d'au moins 4 lettres" });
    }
    if(!confirmPassword){
        errors.push({text: "Vous devez confirmer votre mot de passe!"});
    } else if(confirmPassword.length <= 0) {
        errors.push({ text: 'Confirmez votre mot de passe' });
    }else if (password != confirmPassword) {
        errors.push({ text: 'Les mots de passe ne correspondent pas' });
    }
    
    if (errors.length > 0) {
        res.status(200).json({success:false, message: errors});
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            errors.push({ text: "Mail already in use" });
            //req.flash('error_msg','The email is already in use');
            res.status(200).send({ success:false, message: 'Adresse mail déjà existante' });
        } else {
            const newUser = new User({ name, lastname, email, number, password,active:false });
            newUser.password = await newUser.encryptPassword(password);
            const token = await jwt.sign({ name:newUser.name ,email:newUser.email }, secretKey, {expiresIn:'24h'});//Mail
            newUser.temporarytoken = token;//Mail

            await mail.sendMail({name,lastname,email,token});
            await newUser.save();
            res.status(201).json({ success:true,message:'Signed up' });
        }
    }
};


userCtrl.LoginUser = (req, res) => {
    console.log(req.body);
};

userCtrl.logOut = function (req, res, next) {
    req.logout();
    return res.status(200).json({success:true, message: 'Logout Success' })
}

userCtrl.getUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
};


userCtrl.editUser = async (req, res) => {
    const { number } = req.body;
    console.log(req.body);
    await User.findByIdAndUpdate(req.params.id, { number });
    //req.flash('success_msg','Objet updated successflly');
    res.status(200).json({ success:true, message: 'User modifié' });
};


//Testing mail
userCtrl.activateUser = async (req, res) => {
    const token  = req.params.token;
    console.log('Aqui ', req.params.token);
    
    jwt.verify(token,secretKey,async function(err,decoded){
        if(err){
            res.json({success:false, message:token})
        }else{
            console.log(decoded);
            const user = await User.findOne({temporarytoken:token});
            if(user){
            await User.findByIdAndUpdate(user._id, { active:true,temporarytoken:'already_verified' });
                //res.json({success:true, message: 'Activation link good'})
            }
            res.redirect('http://localhost:4200/signin');
        }
    })

    
    //req.flash('success_msg','Objet updated successflly');
};

module.exports = userCtrl;