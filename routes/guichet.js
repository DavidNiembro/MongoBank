var express = require('express');
var router = express.Router();

// Require the controllers
var guichet_controller = require('../controllers/guichet');

var sessionChecker = (req, res, next) => {

    if (!req.session.hasOwnProperty('user') || !req.cookies.hasOwnProperty('id')) {
        res.redirect('/login');
    } else {
        next();
    }   
  };

// a simple test url to check that all of our files are communicating correctly.
router.get('/', sessionChecker, guichet_controller.index);

router.post('/', sessionChecker, guichet_controller.guichet_create);



module.exports = router;