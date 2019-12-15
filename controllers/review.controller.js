const mongoose = require('mongoose');

const Review = mongoose.model('Review');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// CREATE
module.exports.review_create = (req, res, next) => {
    var review = new Review();

    review.title  = req.body.title;
    review.titleid  = req.body.titleid;
    review.addname= req.body.addname;
    review.addtime= Date();
    review.text   = req.body.text;
    review.rate   = req.body.rate;

    review.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['This review already exists!']);
            else
                return next(err);
            }
    });
}

// READ all
exports.review_read = function (req, res) {
    Review.find(function (err, review) {
        if (err) return next(err);
        res.send(review);
    })
};

// SEARCH
module.exports.review_search = (req, res, next) => {
    var array = new Array();
    var word  = req.params.id;

    Review.find({titleid:word}, (err, review) => {
        console.log(review);
        if (review.length==0) {
            //return res.status(404).json({ status: false, message: "No search results"});
            return res.status(404).send(['No search results']);
        } else {
            for (var i = 0; i < review.length; i++) {
                var searchReview = {
                    ID: review[i]._id,
                    Title: review[i].title,
                    Titleid: review[i].titleid,
                    Addname: review[i].addname,
                    Addtime: review[i].addtime,
                    Text: review[i].text,
                    Rate: review[i].rate
                };
                array.push(searchReview);
            }
            console.log(array);
            return res.status(200).send(array);
        }
    })
};