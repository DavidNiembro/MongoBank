var express = require('express');
var router = express.Router();

// Require the controllers
var transactions_controller = require('../controllers/transactions');

var sessionChecker = (req, res, next) => {

    if (!req.session.hasOwnProperty('user') || !req.cookies.hasOwnProperty('id')) {
        res.redirect('/login');
    } else {
        next();
    }   
  };

// a simple test url to check that all of our files are communicating correctly.
router.get('/', sessionChecker, transactions_controller.index);

router.post('/', sessionChecker, transactions_controller.transactions_create);



module.exports = router;