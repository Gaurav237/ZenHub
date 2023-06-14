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