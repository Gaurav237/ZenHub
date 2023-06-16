const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

// checkAuthentication => will only show profile page if user is signed in 
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',  // name of the authentication strategy 
    {failureRedirect: '/users/sign-in'}  // if the authentication fails.
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);
router.post('/update/:id', passport.checkAuthentication , usersController.update);

module.exports = router;