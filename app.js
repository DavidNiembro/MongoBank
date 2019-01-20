// app.js

var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session'); //we're using 'express-session' as 'session' here
const bcrypt = require("bcrypt");
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var cors = require('cors')

var compte = require('./routes/compte'); // Imports routes for the comptes
var login = require('./routes/auth/login'); // Imports routes for the comptes
var register = require('./routes/auth/register'); // Imports routes for the comptes

var app = express();
app.set('view engine', 'ejs');

app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
});

//var viewPath =__dirname + '/Static files/views';
//app.set('views', viewPath);
// Set up mongoose connection

const User = require('./models/user'); // we shall create this (model/user.js) soon 

var dev_db_url = 'mongodb://127.0.0.1:27017/first';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
    session({
      key: 'id',
      secret: "iy98hcbh489n38984y4h498", // don't put this into your code at production.  Try using saving it into environment variable or a config file.
      resave: true,
      saveUninitialized: false,
      cookie: {
        expires: 600000
      }
    })
  );

app.use(cookieParser());
app.use('/login', login);
app.use('/register', register);

var port = 1234;


  /*
  3. authorization
  =============
  A simple way of implementing authorization is creating a simple middleware for it. Any endpoint that come after the authorization middleware won't pass if user doesn't have a valid session
  */

  app.use('/', compte);
  /*
  4. Logout
  =============
  */
  app.all('/logout', (req, res) => {
        delete req.session.user; // any of these works
        req.session.destroy(); // any of these works
        res.redirect('/login');
  })
  


app.listen(port, () => {
});