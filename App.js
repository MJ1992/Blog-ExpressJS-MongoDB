var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//calling mongoose module
var mongoose = require('mongoose');

//Using application level middleware BodyParser
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//database conffiguration

var dbPath = "mongodb://localhost/BlogApp";

//connect to database
db = mongoose.connect(dbPath);
mongoose.connection.once('open', function() {
    console.log("database Connection success");
});

// Application Level Middleware to log user info into console
app.use(function(req, res, next) {

    var userInfo = {};
    userInfo.HostName = req.hostname;
    userInfo.Path = req.path;
    userInfo.Method = req.method;
    userInfo.RequestedUrl = req.originalUrl;
    userInfo.IP = req.ip;
    userInfo.protocol = req.protocol;
    console.log("User Data : ", userInfo);

    next();
});


//Routes

var routes = require('./Routes/routes.js');

//using route module

app.use('/', routes);


// Error handling middle-ware

app.use(function(err, req, res, next) {

    console.log(err.message);

    res.status(422).send({ error: err.message });
});

//error handle middleware when user enter a wrong url

app.use('*', function(req, res) {
    res.status(404).send("Error 404 : Page not Found");
});

//Port Setup for app
app.listen(3000, function() {

    console.log('App listening on port 3000!');
});