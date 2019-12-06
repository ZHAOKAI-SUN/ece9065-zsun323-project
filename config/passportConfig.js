const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // If the email does not exist
                    else if (!user)
                        return done(null, false, { message: 'This email is not registered!' });
                    // If the password is wrong
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password!' });
                    // Authorized success
                    else
                        return done(null, user);
                });
        })
);