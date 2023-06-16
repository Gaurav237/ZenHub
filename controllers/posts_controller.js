const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
        
    } catch (err) {
        return res.redirect('back');
    }
};

// delete post & all its comments
module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // * .id is string converted from ObjectId(._id)
        // * post.user by default contains user id in string format only (if not populated)
        if(post.user == req.user.id){   
            post.deleteOne();
            
            // delete all comments of that post
            let comments = await Comment.deleteMany({post: req.params.id});
        
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        return res.redirect('back');
    }
}