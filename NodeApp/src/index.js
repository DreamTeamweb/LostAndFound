const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodeOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
//Initializations
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));//To specify where the views folder is, giveen that is in src folder
app.engine('.hbs',exphbs({ //We create the view engine called .hbs
    defaultLayout: 'main',//The main template called main.hbs
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); //We use the engine called .hbs

//Middlewares

app.use(express.urlencoded({extended:false}));
app.use(methodeOverride('_method'));//Para que los formularios puedan enviar otro tipo de metodos como delete
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');//error passport messages (already named as 'error')
    res.locals.user = req.user || null;
    next();
});


//Routes
app.use(require('./routes/index.js'));
app.use(require('./routes/notes.js'));
app.use(require('./routes/users.js'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Server idle
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'))
});