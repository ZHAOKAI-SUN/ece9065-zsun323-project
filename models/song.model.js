const mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
    header: {
        type: String,
        required: 'header can\'t be empty'
    },
    title: {
        type: String,
        required: 'song name can\'t be empty',
        maxlength: [30, 'Name fo song is up to 30 character!'],
        unique: true
    },
    artist: {
        type: String,
        required: 'artist name can\'t be empty',
        maxlength: [30, 'Artist name is up to 30 character!']
    },
    album: {
        type: String,
        required: 'album name can\'t be empty',
        maxlength: [30, 'Album name is up to 30 character!']
    },
    year: {
        type: String,
        required: 'album year can\'t be empty',
        maxlength: [4, 'Album year is up to 4 character!']
    },
    comment: {
        type: String,
        required: 'song comment can\'t be empty',
        maxlength: [28, 'Song comment is up to 28 character!']
    },
    reserve: {
        type: String,
        required: 'reserve comment can\'t be empty'
    },
    track: {
        type: String,
        required: 'track number can\'t be empty',
        maxlength: [1, 'Track number is up to 1 character!']
    },
    genre: {
        type: String,
        required: 'song genre can\'t be empty',
        maxlength: [20, 'Song genre is up to 20 character!']
    },
    nor: {
        type: Number,
        required: 'NOR can\'t be empty'
    },
    ar: {
        type: Number,
        required: 'AR can\'t be empty'
    },
    status: {
        type: String,
        required: 'status can\'t be empty'
    },
    addname: {
        type: String,
        required: 'addname can\'t be empty'
    },
    addtime: {
        type: Date,
        required: 'addtime can\'t be empty'
    }
});


mongoose.model('Song', songSchema);