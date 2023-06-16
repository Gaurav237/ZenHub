const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.end('<h1> Profile Page </h1>');
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'ZenBook | Sign Up'
    });
};

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'ZenBook | Sign In'
    });
};

// to get the sign up data for the user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({email: req.body.email});
        
        if(!existingUser) {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            return res.redirect('/users/sign-in');

        }else{
            return res.redirect('back');
        }

    } catch(err) {
        return;
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}