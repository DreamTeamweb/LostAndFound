const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
//User validation
passport.use(new LocalStrategy({
    usernameField: 'email'
},async(email,password,done)=>{
    const user = await User.findOne({email:email});
    if(!user){
        return done(null,false,{message:'Adresse mail inexistante'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user);
        }else{
            return done(null,false,{message: 'Mauvais mot de passe'});
        }
    }
}));

//Keep a logged account
 passport.serializeUser((user,done) =>{//If the user is logged we save his id 
     done(null, user.id);
 });

 passport.deserializeUser((id,done)=>{//
     User.findById(id,(err,user)=>{
        done(err,user);
     });
 });
