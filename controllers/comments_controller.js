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


// for deleting comments
module.exports.destroy = async function(req, res) {

    try {
        const comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            // we need to delete this comment && also from comments array in Post
            let postId = comment.post;

            // delete the comment
            comment.deleteOne();

            // delete this comment id from Post comments array
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        return res.redirect('back');
    }
}