const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// CREATE
exports.user_create = function (req, res) {
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            status: req.body.status,
            level: req.body.level,
        }
    );
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};

// READ all
exports.user_read = function (req, res) {
    User.find(function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

// READ one by ID
exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

// UPDATE
exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

// DELETE
exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};