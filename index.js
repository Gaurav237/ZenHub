const express = require('express');
const port = 8000;
const app = express();

// routes => for handling requests made to url('/')
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server on port : ${err}`);
        return;
    }
    console.log('Server is up and running on the port : ', port);
});