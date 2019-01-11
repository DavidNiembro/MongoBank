var express = require('express');
var router = express.Router();

// Require the controllers
var register_controller = require('../../controllers/auth/register');

// login index
router.get('/', register_controller.index);

module.exports = router;