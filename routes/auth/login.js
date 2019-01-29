var express = require('express');
var router = express.Router();

// Require the controllers
var login_controller = require('../../controllers/auth/login');

// Login index
router.get('/', login_controller.index);

router.post('/', login_controller.login);

module.exports = router;