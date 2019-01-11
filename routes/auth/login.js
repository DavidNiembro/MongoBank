var express = require('express');
var router = express.Router();

// Require the controllers
var login_controller = require('../../controllers/auth/login');

// login index
router.get('/', login_controller.index);

module.exports = router;