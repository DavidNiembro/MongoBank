var express = require('express');
var router = express.Router();

// Require the controllers
var register_controller = require('../../controllers/auth/register');

// Register index
router.get('/', register_controller.index);

router.post('/', register_controller.register);

module.exports = router;