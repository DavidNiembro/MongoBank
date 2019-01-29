/**
 * Imports packages
 */
var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var cors = require('cors')
var app = express();

/**
 * Import routes
 */
var compte = require('./routes/compte'); // Imports routes for the comptes
var guichet = require('./routes/guichet'); // Imports routes for the guichet
var login = require('./routes/auth/login'); // Imports routes for the login
var register = require('./routes/auth/register'); // Imports routes for the register
var transactions = require('./routes/transactions'); // Imports routes for the transactions

/**
 *  Use template EJS
 */
app.set('view engine', 'ejs');

/**
 * Use CORS
 */
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
});

/**
 * Create a new connection with the database
 */
var dev_db_url =  'mongodb://127.0.0.1:27017/first';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useNewUrlParser: true });
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Create the app
var port = 1234;
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
    session({
      key: 'id',
      secret: "iy98hcbh489n38984y4h498",
      resave: true,
      saveUninitialized: false,
      cookie: {
        expires: 600000
      }
    })
  );

/**
 * Use Routes in app
 */
app.use('/login', login);
app.use('/register', register);
app.use('/guichet', guichet);
app.use('/transactions', transactions);
app.all('/logout', (req, res) => {
      delete req.session.user;
      req.session.destroy();
      res.redirect('/login');
})
app.use('/', compte);

/**
 * Start app
 */
app.listen(port, () => {
});