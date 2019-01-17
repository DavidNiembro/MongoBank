const User = require('../../models/user'); // we shall create this (model/user.js) soon 
const bcrypt = require("bcrypt");

//Index
exports.index = function (req, res) { 
    res.render('pages/auth/login');
};
/*
    User Sign in
    =============
*/
//We will be using username and password, but it can be improved or modified (e.g email and password or some other ways as you please)  
exports.login = function (req, res) {

    let {username, password} = req.body;
    User.findOne({username: username}, 'username email password', (err, userData) => {
        if(userData==null){
            res.status(401).send('invalid login credentials')
        }else{
            if (!err) {
                let passwordCheck = bcrypt.compareSync(password, userData.password);
                if (passwordCheck) { // we are using bcrypt to check the password hash from db against the supplied password by user
                    req.session.user = {
                    email: userData.email,
                    username: userData.username,
                    id: userData._id
                    }; // saving some user's data into user's session
                    req.session.id = userData._id,
                    req.session.user.expires = new Date(
                    Date.now() + 3 * 24 * 3600 * 1000 // session expires in 3 days
                    );
                    res.status(200).send('You are logged in, Welcome!');
                } else {
                    res.status(401).send('incorrect password');
                }
            } else {
                res.status(401).send('invalid login credentials')
            }
        }
    })
};