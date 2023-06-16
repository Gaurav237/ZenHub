const Post = require('../models/post');

module.exports.home = async function(req, res){
    try {
        let posts = await Post.find({}) 
            .sort('-createdAt')
            .populate('user')
            .populate({  
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
            
        return res.render('home', { 
            title: 'Home', 
            posts: posts, 
        }); 
    }catch(err){
        console.log('error in fetching posts from db');
    }
}

