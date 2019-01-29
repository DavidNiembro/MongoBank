var express = require('express');
var router = express.Router();

// Require the controllers
var transactions_controller = require('../controllers/transactions');

//Is Logged
var sessionChecker = (req, res, next) => {
    if (!req.session.hasOwnProperty('user') || !req.cookies.hasOwnProperty('id')) {
        res.redirect('/login');
    } else {
        next();
    }   
};

router.get('/', sessionChecker, transactions_controller.index);
router.post('/', sessionChecker, transactions_controller.transactions_create);

module.exports = router;