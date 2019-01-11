var express = require('express');
var router = express.Router();

// Require the controllers
var home_controller = require('../controllers/home');

// home index
router.get('/', home_controller.index);

module.exports = router;