const mongoose = require('mongoose');

var playlistSchema = new mongoose.Schema({

    pname: {
        type: String,
        required: 'song name can\'t be empty',
        maxlength: [50, 'Name fo song is up to 30 character!']
    },
    description: {
        type: String,
        required: 'artist name can\'t be empty',
        maxlength: [200, 'Artist name is up to 30 character!']
    },
    addname: {
        type: String
    },
    addtime: {
        type: Date
    },
    status: {
        type: String,
        required: 'status can\'t be empty'
    },
    pname0addname: {
        type: String,
        required: 'addname can\'t be empty',
        unique: true
    }
});


mongoose.model('Playlist', playlistSchema);