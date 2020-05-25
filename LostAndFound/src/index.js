const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');//
const methodeOverride = require('method-override');//
const session = require('express-session');
const flash = require('connect-flash');//
const passport = require('passport');
const morgan = require ('morgan');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

//Initializations
const app = express();
/****MongoDb */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lost-n-found',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
    .then(db=> console.log('DB is connected'))
    .catch(err => console.error(err));

///////////////////////////////////

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodeOverride('_method'));//Para que los formularios puedan enviar otro tipo de metodos como delete
app.use(cors({
    origin:'http://localhost:4200',
    credentials: true
}));

app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'mysecret-app',
    cookie:{
      maxAge:36000000,
      httpOnly:false,
      secure:false
}/*,store: new MongoStore({mongooseConnection: mongoose.connection})*/
}));
require('./config/passport');
app.use(express.json());
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
app.use(require('./routes/objects.js'));

//Static files
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.resolve('uploads')));
//Server idle
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'))
});