const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // method of authentication
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    // here '_email' & '_password' are entered by user
    async function(_email, _password, done){
        // find a user and establish its identity
        try{
            const user = await User.findOne({email: _email});

            if(!user || user.password != _password){
                console.log('Invalid Username | Password');
                return done(null, false);
            }

            // User found with correct password
            return done(null, user);
        }catch(err) {
            console.log('error in finding the user [Passport]');
            return done(err);
        }
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from key in cookies
passport.deserializeUser(async function(id, done){
    try{
        const user = await User.findById(id)
        return done(null, user);
    } catch(err){
        console.log('error in finding the user [Passport]');
        return done(err);
    }
});

module.exports = passport;