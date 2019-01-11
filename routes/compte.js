var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var compte_controller = require('../controllers/compte');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', compte_controller.test);


router.post('/create', compte_controller.compte_create);

router.get('/:id', compte_controller.compte_details);

router.put('/:id/update', compte_controller.compte_update);

router.delete('/:id/delete', compte_controller.compte_delete);


module.exports = router;