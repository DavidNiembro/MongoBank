const User = require('../../models/user'); // we shall create this (model/user.js) soon 

//Index
exports.index = function (req, res) {
    res.render('pages/auth/register');
};

/*
1. User Sign up
=============
*/
// here we're expecting username, fullname, email and password in body of the request for signup. Note that we're using post http method
exports.register = function (req, res) {
    let {username, fullname, email, password} = req.body; // this is called destructuring. We're extracting these variables and their values from 'req.body'
      
      let userData = {
          username,
          password: bcrypt.hashSync(password, 5), // we are using bcrypt to hash our password before saving it to the database
          fullname,
          email
      };
      
      let newUser = new User(userData);
      newUser.save().then(error => {
          if (!error) {
              return res.status(201).json('signup successful')
          } else {
              if (error.code ===  11000) { // this error gets thrown only if similar user record already exist.
                  return res.status(409).send('user already exist!')
              } else {
                  console.log(JSON.stringify(error, null, 2)); // you might want to do this to examine and trace where the problem is emanating from
                  return res.status(500).send('error signing up user')
              }
          }
      })
  };