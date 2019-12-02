const Song = require('../models/song.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// CREATE
exports.song_create = function (req, res) {
    let song = new Song(
        {
            header : req.body.header,
            title  : req.body.title,
            artist : req.body.artist,
            album  : req.body.album,
            year   : req.body.year,
            comment: req.body.comment,
            reserve: req.body.reserve,
            track  : req.body.track,
            genre  : req.body.genre,
            nor    : req.body.nor,
            ar     : req.body.ar,
            status : req.body.status,
            addname: req.body.addname,
            addtime: req.body.addtime,
        }
    );
    song.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Song Created successfully')
    })
};

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