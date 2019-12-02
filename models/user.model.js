const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 50},
    status  : {type: Number, required: true, max:  1},
    level   : {type: Number, required: true, max:  1},
});

// Export the model
module.exports = mongoose.model('User', UserSchema);