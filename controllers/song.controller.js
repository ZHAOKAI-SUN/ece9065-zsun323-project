const mongoose = require('mongoose');

const Song = mongoose.model('Song');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// CREATE
module.exports.song_create = (req, res, next) => {
    var song = new Song();

    // ↓ ID3V1 Attributes
    song.header = "TAG"; // In ID3V1, always "TAG"
    song.title  = req.body.title;
    song.artist = req.body.artist;
    song.album  = req.body.album;
    song.year   = req.body.year;
    song.comment= req.body.comment;
    song.reserve= "0"; // Reserved attribute.  Default value: "0"
    song.track  = req.body.track; // Number of this song in the album
    song.genre  = req.body.genre; // Song style
    // ↓ Website Attributes
    song.nor    = "0"; // Number of reviews. Default value: "0"
    song.ar     = "0";     // Number of reviews. Default value: "0"
    song.status = "Normal";  // Default value: "Normal". Can be changed to "Hidden" by the admin
    song.addname= req.body.addname;
    song.addtime= Date();

    song.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['This song already exists!']);
            else
                return next(err);
            }
    });
}



// READ all
exports.song_read = function (req, res) {
    Song.find(function (err, song) {
        if (err) return next(err);
        res.send(song);
    })
};

// READ one by ID
exports.song_details = function (req, res) {
    Song.findById(req.params.id, function (err, song) {
        if (err) return next(err);
        res.send(song);
    })
};

// UPDATE
exports.song_update = function (req, res) {
    Song.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, song) {
        if (err) return next(err);
        res.send('Song udpated.');
    });
};

// DELETE
exports.song_delete = function (req, res) {
    Song.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};