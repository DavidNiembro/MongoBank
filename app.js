// app.js

var express = require('express');
var bodyParser = require('body-parser');

var compte = require('./routes/compte'); // Imports routes for the comptes
var home = require('./routes/home'); // Imports routes for the comptes

var app = express();
app.set('view engine', 'ejs');


// Set up mongoose connection
var mongoose = require('mongoose');

var dev_db_url = 'mongodb://127.0.0.1:27017/first';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/comptes', compte);
app.use('/', home);

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});