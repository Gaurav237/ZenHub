const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toggleFriendship = async function(req, res){
    try{

        let fromUser = await User.findById(req.query.fromUserId);
        let toUser = await User.findById(req.query.toUserId);

        if (!fromUser || !toUser) {
            return res.status(404).json({ 
                message: 'One or both users not found' 
            });
        }

        let existingFriendship = await Friendship.findOne({
            from_user: fromUser,
            to_user: toUser
        })
        .populate('to_user', 'name avatar');

        if (existingFriendship) {
            // If already friends, unfriend/cancel the friend request

            // Remove the friendship from both users
            fromUser.friendships.pull(existingFriendship._id);
            await fromUser.save();

            toUser.friendships.pull(existingFriendship);
            await toUser.save();

            // Remove the friendship document
            await existingFriendship.deleteOne();

            return res.status(200).json({ 
                message: 'Friendship removed successfully',
                isFriend: true,
                friend: {
                    id: toUser._id,
                }
            });
        }else{
            // If not friends, send a friend request
            let newFriendship = new Friendship({
                from_user: fromUser,
                to_user: toUser
            });

            // Save the friendship to the database
            await newFriendship.save();

            // Update the friendships arrays of both users
            fromUser.friendships.push(newFriendship);
            await fromUser.save();
            toUser.friendships.push(newFriendship);
            await toUser.save();

            return res.status(200).json({
                message: 'Friend request sent successfully',
                isFriend: false,
                friend: {
                    id: toUser._id,
                    name: toUser.name,
                    avatar: toUser.avatar
                }
            });
        }

    }catch(err){
        console.error(err);
        return res.status(500).json({ 
            message: 'Internal Server Error' 
        });
    }
}
