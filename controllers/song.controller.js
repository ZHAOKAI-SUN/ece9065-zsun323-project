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
    song.nor    =  0 ; // Number of reviews. Default value: "0"
    song.ar     = "0";     // Number of reviews. Default value: "0"
    song.status = "Normal";  // Default value: "Normal". Can be changed to "Hidden" by the admin
    song.addname= req.body.addname;
    song.addtime= Date();
    song.title0artist= req.body.title+"0"+req.body.artist;

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

// READ TOP 10
module.exports.song_top10 = (req, res, next) => {
    var array = new Array();
    Song.find({ status: { $ne: 'Hidden'} }).sort({ nor: -1}).limit(10).then((song) => { // Don't find songs with a status of "hidden"
        console.log(song);
        for (var i = 0; i < song.length; i++) {
            var searchSong = {
                // ↓ Primary keys
                TOP: i+1,
                ID: song[i]._id,
                // ↓ ID3V1 Attributes
                Header: song[i].header,
                Title: song[i].title,
                Artist: song[i].artist,
                Album: song[i].album,
                Year: song[i].year,
                Comment: song[i].comment,
                Reserve: song[i].reserve,
                Track: song[i].track,
                Genre: song[i].genre,
                // ↓ Website Attributes
                Nor: song[i].nor,
                Ar: song[i].ar,
                Status: song[i].status,
                Addname: song[i].addname,
                Addtime: song[i].addtime
            };
            array.push(searchSong);
        }
        return res.status(200).send(array);
    })
};

// SEARCH
module.exports.song_search = (req, res, next) => {
    var array = new Array();
    var word  = req.params.id;
    word = word.replace(/\s/g, "");
    console.log(word);

    var _filter = {
        $or: [
            { title: { $regex: word, $options: '$i'} },
            { artist: { $regex: word, $options: '$i'} },
            { album: { $regex: word, $options: '$i'} },
            { year: { $regex: word, $options: '$i'} },
            { comment: { $regex: word, $options: '$i'} },
            { reserve: { $regex: word, $options: '$i'} },
            { track: { $regex: word, $options: '$i'} },
            { genre: { $regex: word, $options: '$i'} }
        ]
    }

    Song.find(_filter, (err, song) => {
        console.log(song);
        if (song.length==0) {
            //return res.status(404).json({ status: false, message: "No search results"});
            return res.status(404).send(['No search results']);
        } else {
            for (var i = 0; i < song.length; i++) {
                var searchSong = {
                    // ↓ Primary keys
                    TOP: i+1,
                    ID: song[i]._id,
                    // ↓ ID3V1 Attributes
                    Title: song[i].title,
                    Artist: song[i].artist,
                    Album: song[i].album,
                    Year: song[i].year,
                    Comment: song[i].comment,
                    Reserve: song[i].reserve,
                    Track: song[i].track,
                    Genre: song[i].genre,
                    // ↓ Website Attributes
                    Nor: song[i].nor,
                    Ar: song[i].ar,
                    Status: song[i].status,
                    Addname: song[i].addname,
                    Addtime: song[i].addtime
                };
                array.push(searchSong);
            }
            console.log(array);
            return res.status(200).send(array);
        }
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
        res.status(200).send(['Song udpated.']);
    });
};

// DELETE
exports.song_delete = function (req, res) {
    Song.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};