//MAILING TEST

const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date:{type: Date, default: Date.now},
    active: {type: Boolean, required: true, defaull:false},
    temporarytoken:{type: String, required: true}
});


module.exports = mongoose.model('UserTest', UserSchema);