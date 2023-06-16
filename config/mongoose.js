const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/zenhub_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
    console.log('Successfully connected to the Database');
});

module.exports = db;