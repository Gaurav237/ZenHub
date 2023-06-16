const User = require('../models/user');

module.exports.profile = async function(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user
      });
    } catch (err) {
      console.log('Error in finding profile page of user', err);
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

// sign out action
module.exports.destroySession = function(req, res, next){

    req.logout(err => {
        if(err){
            return next(err);
        }
    });  
    return res.redirect('/');
}

// update profile page
module.exports.update = async function(req, res) {
    const userId = req.params.id;

    if (req.user.id == userId) {
        try {
            await User.findByIdAndUpdate(userId, {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            });

            console.log('User information updated');
            return res.redirect('back');
        } catch (err) {
            console.log('Error in updating user information');
            return res.redirect('back');
        }
    } else {
        return res.status(401).send('Unauthorized');
    }
};