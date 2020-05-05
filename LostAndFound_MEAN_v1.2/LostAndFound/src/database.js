const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lost-n-found',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
    .then(db=> console.log('DB is connected'))
    .catch(err => console.error(err));

//Database queries
//db.collection.find()