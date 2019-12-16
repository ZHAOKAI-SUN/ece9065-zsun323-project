const mongoose = require('mongoose');

const Playlist = mongoose.model('Playlist');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// CREATE
module.exports.playlist_create = (req, res, next) => {
    var playlist = new Playlist();

    // ↓ ID3V1 Attributes
    playlist.pname = req.body.pname;
    playlist.description = req.body.description;
    playlist.addname = req.body.addname;
    playlist.addtime = Date();
    playlist.status  = "Private";  // Default value: "Private". Can be changed to "Public"
    playlist.pname0addname= req.body.pname+"0"+req.body.addname;

    playlist.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['This playlist already exists!']);
            else
                return next(err);
            }
    });
}

// READ all
exports.playlist_read = function (req, res) {
    Playlist.find(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
    })
};

// READ one by ID
exports.playlist_details = function (req, res) {
    Playlist.findById(req.params.id, function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
    })
};

// SEARCH
module.exports.playlist_search = (req, res, next) => {
    var array = new Array();
    var word  = req.params.id;
    word = word.replace(/\s/g, "");
    console.log(word);

    var _filter = {
        $and: [{
        $or: [
            { pname: { $regex: word, $options: '$i'} },
            { description: { $regex: word, $options: '$i'} }
        ]
            }, {status: { $ne: 'Private' } }]
    }

    Playlist.find(_filter, (err, playlist) => {
        console.log(playlist);
        if (playlist.length==0) {
            //return res.status(404).json({ status: false, message: "No search results"});
            return res.status(404).send(['No search results']);
        } else {
            for (var i = 0; i < playlist.length; i++) {
                var searchPlaylist = {
                    ID: playlist[i]._id,
                    Pname: playlist[i].pname,
                    Description: playlist[i].description,
                    Addname: playlist[i].addname,
                    Addtime: playlist[i].addtime,
                    Status: playlist[i].status,
                };
                array.push(searchPlaylist);
            }
            console.log(array);
            return res.status(200).send(array);
        }
    })
};

// SEARCH MY
module.exports.playlist_searchmy = (req, res, next) => {
    var array = new Array();
    var word  = req.params.id;
    word = word.replace(/\s/g, "");
    console.log(word);

    var _filter = {
        $or: [
            { addname: { $regex: word, $options: '$i'} }
        ]
    }

    Playlist.find(_filter, (err, playlist) => {
        console.log(playlist);
        if (playlist.length==0) {
            //return res.status(404).json({ status: false, message: "No search results"});
            return res.status(404).send(['No search results']);
        } else {
            for (var i = 0; i < playlist.length; i++) {
                var searchPlaylist = {
                    ID: playlist[i]._id,
                    Pname: playlist[i].pname,
                    Description: playlist[i].description,
                    Addname: playlist[i].addname,
                    Addtime: playlist[i].addtime,
                    Status: playlist[i].status,
                };
                array.push(searchPlaylist);
            }
            console.log(array);
            return res.status(200).send(array);
        }
    })
};

// UPDATE
exports.playlist_update = function (req, res) {
    Playlist.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, playlist) {
        if (!err) {
            res.status(200).send(['Playlist udpated.']);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['You already have a playlist with the same name!']);
            else
                return next(err);
            }
    });
};





// DELETE
exports.playlist_delete = function (req, res) {
    Playlist.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.status(200).send('Deleted successfully!');
    })
};