const User = require('../../models/user');
var Compte = require('../../models/compte');

const bcrypt = require("bcrypt");

//Index
exports.index = function (req, res) {
    res.render('pages/auth/register');
};

/**
 * Register
 */
exports.register = function (req, res) {

    //Collect data from POST
    let {username, fullname, email, password} = req.body;

    //Create the user data
    let userData = {
        username,
        password: bcrypt.hashSync(password, 5), // we are using bcrypt to hash our password before saving it to the database
        fullname,
        email
    };

    //Add compte Epargne 
    let epargneData = {
        name:'Epargne',
    };

    //Add compte Courant 
    let courantData = {
        name:'Courant',
    };
    
    //Create a new user 
    let newUser = new User(userData);
    newUser.comptes.push(new Compte(epargneData))
    newUser.comptes.push(new Compte(courantData))

    //Save new user
    newUser.save().then(error => {
        if (!error) {
            res.redirect('/login');
        } else {
            if (error.code ===  11000) { // this error gets thrown only if similar user record already exist.
                res.redirect('/login');
            } else {
                res.redirect('/login');
            }
        }
    })
  };