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
                    // If the account is not activated (email activation)
                    else if (user.status == "Not-active")
                        return done(null, false, { message: 'User not activated!' });
                    // If the account is locked
                    else if (user.status == "Locked")
                        return done(null, false, { message: 'Your account is locked. Please contact the administrator!' });
                    // Authorized success
                    else
                        return done(null, user);
                });
        })
);