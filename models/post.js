const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  // user object id is always unique
        ref: 'User'  // reference to User Schema
    },
    // inlcude all the ids of comments in this post schema in an array
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;