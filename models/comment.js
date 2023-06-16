const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belong to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // comment also belong to a Post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;