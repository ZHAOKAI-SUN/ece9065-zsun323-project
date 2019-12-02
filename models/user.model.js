const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true}, // user name
    password: {type: String, required: true}, // user password
    status  : {type: Number, required: true}, // user status : 0=normal, 1=deactivated, 2=waitactive
    level   : {type: Number, required: true}, // user level : 0=normal, 1=admin
});

// Export the model
module.exports = mongoose.model('User', UserSchema);