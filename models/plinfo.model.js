const mongoose = require('mongoose');

var plinfoSchema = new mongoose.Schema({

    plid: {
        type: String
    },
    plname: {
        type: String
    },
    songid: {
        type: String
    },
    songname: {
        type: String
    },
    songartist: {
        type: String
    },
    plid0songid: {
        type: String,
        unique: true
    }
});


mongoose.model('Plinfo', plinfoSchema);