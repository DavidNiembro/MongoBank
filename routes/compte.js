var express = require('express');
var router = express.Router();

// Require the controllers
var compte_controller = require('../controllers/compte');

//Is Logged
var sessionChecker = (req, res, next) => {
    if (!req.session.hasOwnProperty('user') || !req.cookies.hasOwnProperty('id')) {
        res.redirect('/login');
    } else {
        next();
    }   
};

router.get('/', sessionChecker, compte_controller.index);
router.get('/:id', sessionChecker, compte_controller.compte_details);

module.exports = router;