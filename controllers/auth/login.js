const User = require('../../models/user'); 
const bcrypt = require("bcrypt");

/**
 * Index
 */
exports.index = function (req, res) { 
    res.render('pages/auth/login');
};
/**
 * Login 
 */  
exports.login = function (req, res) {
    let {username, password} = req.body;
    User.findOne({username: username}, 'username email password', (err, userData) => {
        
        //Invalid login credentials'
        if(userData==null){
           res.redirect('/login');
        }else{
            if (!err) {
                let passwordCheck = bcrypt.compareSync(password, userData.password);

                //Pass the pasword's validation ?
                if (passwordCheck) { 

                    //Save the user in the session
                    req.session.user = {
                        email: userData.email,
                        username: userData.username,
                        id: userData._id
                    };
                    req.session.id = userData._id,
                    req.session.user.expires = new Date(
                        Date.now() + 3 * 24 * 3600 * 1000 // session expires in 3 days
                    );

                    res.redirect('/');
                } else {

                    //Incorrect password
                    res.redirect('/login');
                }   
            } else {

                //Invalid login credentials'
                res.redirect('/login');
            }
        }
    })
};