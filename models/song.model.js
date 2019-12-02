const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    header  : {type: String, required: true}, // Always 'TAG'
    title   : {type: String, required: true}, // Song name
    artist  : {type: String, required: true}, // Song artist
    album   : {type: String, required: false}, // Album name
    year    : {type: Number, required: false}, // Year of album release
    comment : {type: String, required: false}, // Comments
    reserve : {type: Number, required: false}, // Reserved attribute. If the comment bytes is 28, this is 0.
    track   : {type: Number, required: false}, // Number of this song in the album
    genre   : {type: Number, required: false}, // Song style
    nor     : {type: Number, required: true}, // Numbers of reviews
    ar      : {type: Number, required: true}, // Average rating
    status  : {type: Number, required: true}, // Song status : 0=normal, 1=hidden
    addname : {type: String, required: true}, // Adder's username
    addtime : {type: String, required: true}, // Add time
});

// Export the model
module.exports = mongoose.model('Song', SongSchema);