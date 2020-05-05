const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectSchema = new Schema({
    type:{type:String, required:true},
    location:{type:String, required:true},
    description:{type:String, required:true},
    date:{type:Date, default:Date.now},
    user:{type:String,required:true}
});

module.exports = mongoose.model('Objet',ObjectSchema);