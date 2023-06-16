const express = require('express');
const port = 8000;
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// setting up template view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// middleware used for encrypting session cookies
app.use(session({
    name: 'zenhub',
    secret: 'zenhub', // key used for encryption
    saveUninitialized: false, // will not save uninitialized(no modifications) sessions to the session store
    resave: false, // will only save the session object to the session store if it has been modified during the request.
    cookie: {
        maxAge: (1000 * 60 * 100)  // expiry age(ms) of the session cookie
    }
}));

app.use(passport.initialize());  // initializes Passport.js.
app.use(passport.session());  // enables session support for Passport.js

// routes => for handling requests made to url('/')
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server on port : ${err}`);
        return;
    }
    console.log('Server is up and running on the port : ', port);
});