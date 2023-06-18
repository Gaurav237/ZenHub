const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines object id of liked object
    likeable : {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel',  // for dynamic relationship
    },
    // this defines the type of liked object 
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']  // only these two Models can be referenced
    }
},{
    timestamps: true
});

const Like = mongoose.Model('Like', likeSchema);

module.exports = Like;