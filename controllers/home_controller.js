const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try {
        // [CHANGE] populate the likes of each post and comment
        let posts = await Post.find({}) 
            .sort('-createdAt')
            .populate('user')
            .populate({  
                path: 'comments',
                populate: [
                { path: 'user' },
                { path: 'likes' }
            ]})
            .populate('likes');

        let users = await User.find({});

        // Populate user.friendships with to_user information
        let populatedUser;
        if(req.user){
            populatedUser = await User.findById(req.user.id).populate({
                path: 'friendships',
                populate: { path: 'to_user' }
            });
        }

        return res.render('home', { 
            title: 'Home', 
            posts: posts, 
            all_users: users,
            user: populatedUser
        }); 
    }catch(err){
        console.log('error in fetching posts from db',);
        return res.status(500).json({ 
            error: 'An error occurred while fetching posts. ' 
        });
    }
}

