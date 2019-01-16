// app.js

var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session'); //we're using 'express-session' as 'session' here
const bcrypt = require("bcrypt");
var mongoose = require('mongoose');

var compte = require('./routes/compte'); // Imports routes for the comptes
var home = require('./routes/home'); // Imports routes for the comptes
var login = require('./routes/auth/login'); // Imports routes for the comptes
var register = require('./routes/auth/register'); // Imports routes for the comptes

var app = express();
app.set('view engine', 'ejs');


// Set up mongoose connection

const User = require('./models/user'); // we shall create this (model/user.js) soon 

var dev_db_url = 'mongodb://127.0.0.1:27017/first';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
    session({
      secret: "iy98hcbh489n38984y4h498", // don't put this into your code at production.  Try using saving it into environment variable or a config file.
      resave: true,
      saveUninitialized: false
    })
  );

app.use('/login', login);
app.use('/register', register);
app.use('/comptes', compte);
app.use('/', home);

var port = 1234;



  /*
  3. authorization
  =============
  A simple way of implementing authorization is creating a simple middleware for it. Any endpoint that come after the authorization middleware won't pass if user doesn't have a valid session
  */
  app.use((req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send('Authrization failed! Please login');
    }
  });
  
  /*
  4. Logout
  =============
  */
  app.all('/logout', (req, res) => {
    delete req.session.user; // any of these works
        req.session.destroy(); // any of these works
      res.status(200).send('logout successful')
  })
  
  /*
  4. Password reset
  =================
  We shall be using two endpoints to implement password reset functionality
  */
  app.post('/forgot', (req, res) => {
    let {email} = req.body; // same as let email = req.body.email
    User.findOne({email: email}, (err, userData) => {
      if (!err) {
        userData.passResetKey = shortid.generate();
        userData.passKeyExpires = new Date().getTime() + 20 * 60 * 1000 // pass reset key only valid for 20 minutes
        userData.save().then(err => {
            if (!err) {
              // configuring smtp transport machanism for password reset email
              let transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                auth: {
                  user: '', // your gmail address
                  pass: '' // your gmail password
                }
              });
              let mailOptions = {
                subject: `NodeAuthTuts | Password reset`,
                to: email,
                from: `NodeAuthTuts <yourEmail@gmail.com>`,
                html: `
                  <h1>Hi,</h1>
                  <h2>Here is your password reset key</h2>
                  <h2><code contenteditable="false" style="font-weight:200;font-size:1.5rem;padding:5px 10px; background: #EEEEEE; border:0">${passResetKey}</code></h4>
                  <p>Please ignore if you didn't try to reset your password on our platform</p>
                `
              };
              try {
                transporter.sendMail(mailOptions, (error, response) => {
                  if (error) {
                    console.log("error:\n", error, "\n");
                    res.status(500).send("could not send reset code");
                  } else {
                    console.log("email sent:\n", response);
                    res.status(200).send("Reset Code sent");
                  }
                });
              } catch (error) {
                console.log(error);
                res.status(500).send("could not sent reset code");
              }
            }
          })
      } else {
        res.status(400).send('email is incorrect');
      }
    })
  });
  
  app.post('/resetpass', (req, res) => {
    let {resetKey, newPassword} = req.body
      User.find({passResetKey: resetKey}, (err, userData) => {
          if (!err) {
              let now = new Date().getTime();
              let keyExpiration = userDate.passKeyExpires;
              if (keyExpiration > now) {
          userData.password = bcrypt.hashSync(newPassword, 5);
                  userData.passResetKey = null; // remove passResetKey from user's records
                  userData.keyExpiration = null;
                  userData.save().then(err => { // save the new changes
                      if (!err) {
                          res.status(200).send('Password reset successful')
                      } else {
                          res.status(500).send('error resetting your password')
                      }
                  })
              } else {
                  res.status(400).send('Sorry, pass key has expired. Please initiate the request for a new one');
              }
          } else {
              res.status(400).send('invalid pass key!');
          }
      })
  })


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});