var express = require('express');
var router = express.Router();

// Require the controllers
var compte_controller = require('../controllers/compte');

var sessionChecker = (req, res, next) => {

    if (!req.session.hasOwnProperty('user') || !req.cookies.hasOwnProperty('id')) {
        res.redirect('/login');
    } else {
        next();
    }   
  };

// a simple test url to check that all of our files are communicating correctly.
router.get('/', sessionChecker, compte_controller.index);

router.post('/create', compte_controller.compte_create);

router.get('/:id', compte_controller.compte_details);

router.put('/:id/update', compte_controller.compte_update);

router.delete('/:id/delete', compte_controller.compte_delete);


module.exports = router;