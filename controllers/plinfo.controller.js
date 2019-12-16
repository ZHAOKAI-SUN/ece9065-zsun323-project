const mongoose = require('mongoose');

const Plinfo = mongoose.model('Plinfo');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// CREATE
module.exports.plinfo_create = (req, res, next) => {
    var plinfo = new Plinfo();

    plinfo.plid       = req.body.plid;
    plinfo.plname     = req.body.plname;
    plinfo.songid     = req.body.songid;
    plinfo.songname   = req.body.songname;
    plinfo.songartist = req.body.songartist;
    plinfo.plid0songid = req.body.plid+"0"+req.body.songid;

    plinfo.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['This song already exists in your playlist!']);
            else
                return next(err);
            }
    });
}

// SEARCH by playlist ID
module.exports.plinfo_search = (req, res, next) => {
    var array = new Array();
    var word  = req.params.id;
    word = word.replace(/\s/g, "");
    console.log(word);

    var _filter = {
        $or: [
            { plid: { $regex: word, $options: '$i'} }
        ]
    }

    Plinfo.find(_filter, (err, plinfo) => {
        console.log(plinfo);
        if (plinfo.length==0) {
            //return res.status(404).json({ status: false, message: "No search results"});
            return res.status(404).send(['No search results']);
        } else {
            for (var i = 0; i < plinfo.length; i++) {
                var searchPlinfo = {
                    ID: plinfo[i]._id,
                    PLid: plinfo[i].plid,
                    PLname: plinfo[i].plname,
                    SONGid: plinfo[i].songid,
                    SONGname: plinfo[i].songname,
                    SONGartist: plinfo[i].songartist,
                };
                array.push(searchPlinfo);
            }
            console.log(array);
            return res.status(200).send(array);
        }
    })
};

// DELETE
exports.plinfo_delete = function (req, res) {
    Plinfo.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.status(200).send(['Deleted successfully!']);
    })
};