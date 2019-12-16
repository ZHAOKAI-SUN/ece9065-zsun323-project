const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

var nodemailer = require('nodemailer'); // Import Nodemailer Package
var sgTransport = require('nodemailer-sendgrid-transport'); // Import Nodemailer Sengrid Transport Package

// Set authorization for active email
var options = {
    auth: {
        api_user: 'zsun323', // Sendgrid username
        api_key: 'Szk1sc2019!' // Sendgrid password
    }
}
var client = nodemailer.createTransport(sgTransport(options));

const User = mongoose.model('User');

// User registration
module.exports.register = (req, res, next) => {
    var user = new User();
    
    user.email = req.body.email;
    user.password = req.body.password;
    user.status = "Not-active"; // Default value: "Not-active" . After email verification, becomes "Normal" // 3 options: Normal, Locked, Not-active
    user.level = "Normal";      // Default value: "Normal" // 2 options: Normal, Admin

    user.save((err, doc) => {
        if (!err) {
            // Set message content
            var email = {
                from: 'Localhost Staff, activation@tonymusic.ca',
                to: user.email,
                subject: 'Account Activation Email - Tony Music',
                text: 'Thank you for being TONY MUSIC member!',
                html:  'Hi, dear ' + user.email + ' :<br><br>Thank you for registering our website. Please click the following link to activate your account :<br><br><a href="http://localhost:8080/api/user/open/activate/' + user.email + '">Please click on me!</a>'
            };
            client.sendMail(email, function(err, info) {
                if (err) console.log(err);
            });
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['This email has been registered.']);
            else
                return next(err);
            }
    });
}

// User activation
module.exports.activateUser = (req, res) => {
    console.log(req.params.token);
        User.findOneAndUpdate({email:req.params.token},{$set:{status:'Normal'}}).then((updatedDoc)=>{
            //user.active = true;
            res.send('<html>Congratulations !<br><br>Account has been activated !<br><br><a href="http://localhost:4200/login">Log in now !</a></html>');
        });
}

// Token authorization
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// User profile
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['email','status','level']) });
        }
    );
}

// 
module.exports.resend = (req, res, next) =>{
    var email = {
        from: 'Localhost Staff, activation@tonymusic.ca',
        to: req.body.email,
        subject: 'Account Activation Email - Tony Music',
        text: 'Thank you for being TONY MUSIC member!',
        html:  'Hi, dear ' + req.body.email + ' :<br><br>Thank you for registering our website. Please click the following link to activate your account :<br><br><a href="http://localhost:8080/api/user/open/activate/' + req.body.email + '">Please click on me!</a>'
    };
    client.sendMail(email, function(err, info) {
        if (err) console.log(err);
        res.send(info);
    });
}

// Read all user
exports.user_read = function (req, res) {
    User.find(function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

// UPDATE
exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.status(200).send(['User udpated.']);
    });
};