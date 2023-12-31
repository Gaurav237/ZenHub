const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();

router.get('/', homeController.home);

router.use('/users', require('./users'));

router.use('/posts', require('./posts')); 

router.use('/comments', require('./comments'));

router.use('/likes', require('./likes'));

router.use('/friendship', require('./friendship'));

module.exports = router;