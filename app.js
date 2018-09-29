// Modules

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const request = require('request');
const mongoose = require('mongoose');
const path = require('path');
var app = express();

// Config

const connStr = 'mongodb://localhost:27017/fantasycrypto';
mongoose.connect(connStr, (err) => {
    if(err) throw err;
    console.log('Connected to MongoDB');
});
mongoose.Promise = global.Promise;

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/assets'));
app.use(session(
    {
        secret: 'ADlOclXcnmwvX',
        resave: false,
        saveUninitialized: true,
        cookie : {
            maxAge: 12398482834
        }
    }
));
app.use(function(req, res, next) {
    res.locals.register = req.session.register;
    res.locals.login = req.session.login;
    res.locals.purchaseError = req.session.purchaseError;
    res.locals.sellError = req.session.sellError;
    next();
});
app.use(bodyParser.urlencoded({extended: true}));

// Router

app.use(require('./routes/router'));

app.listen(8000, () => {
    console.log("Listening on port 8000...");
});
