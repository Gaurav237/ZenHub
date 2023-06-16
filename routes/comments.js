const express = require('express');
const passport = require('passport');
const commentsController = require('../controllers/comments_controller');

const router = express.Router();

// controller level authentication added for commenting on post.
router.post('/create', passport.checkAuthentication , commentsController.create);

module.exports = router;