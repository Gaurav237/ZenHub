const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',  // name of the authentication strategy 
    {failureRedirect: '/users/sign-in'}  // if the authentication fails.
), usersController.createSession);

module.exports = router;