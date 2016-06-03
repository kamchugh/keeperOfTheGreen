var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.get('/users', userCtrl.index);

router.post('/', userCtrl.create);

module.exports = router;
