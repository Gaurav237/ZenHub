const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try{
        const post = await Post.findById(req.body.post_id);

        // if post present then add the comment on that post
        if(post){
            let comment = await Comment.create({
                content: req.body.post_content,
                post: req.body.post_id,
                user: req.user._id
            });

            post.comments.push(comment);  // add this comment to that post
            post.save();  //  save the changes made to the post object back to the database
        
            return res.redirect('/');
        }else{
            return res.redirect('/');
        }
    }catch(err){
        return res.redirect('/');
    }
}