const User = require('../models/user');

module.exports.profile = async function(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user
      });
    } catch (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
};

module.exports.signUp = function(req, res){
    // restricting page access
    // once signed up, then we cant again go to sign-up OR sign-in page using url 
    // isAuthenticated() => used to check if a user is authenticated or logged in.
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'ZenBook | Sign Up'
    });
};

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'ZenBook | Sign In'
    });
};

// to get the sign up data for the user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Password & Confirm Password did not match !');
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
            req.flash('success' ,'Congratulations! You have successfully signed up. Welcome to our community! ');
            return res.redirect('/users/sign-in');

        }else{
            req.flash('error', 'User with same email id already exists!');
            return res.redirect('back');
        }

    } catch(err) {
        req.flash('error', err);
        return;
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged-In Successfully!');
    return res.redirect('/');
}

// sign out action
module.exports.destroySession = function(req, res, next){

    req.logout(err => {
        if(err){
            req.flash('error', err);
            return next(err);
        }
    });  

    req.session.save(() => {
        req.flash('success', 'You have been successfully logged out. Come back soon!');
        return res.redirect('/');
    });
}

// update profile page
module.exports.update = async function(req, res) {
    const userId = req.params.id;

    if (req.user.id == userId) {
        try {
            let user = await User.findById(userId);
            
            User.uploadedAvatar(req, res, async function(err) {
                if(err) {
                    console.log(err);
                    return;
                }

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){  // photo upload is not set required 
                    // this saves the path of uploaded file into avatar field in user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                await user.save();
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        return res.status(401).send('Unauthorized');
    }
};