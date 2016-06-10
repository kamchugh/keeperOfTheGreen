var express = require('express');
var router = require('./loginRoutes');
var signupCtrl = require('../controllers/signupCtrl');
var userCtrl = require('../../app_api/controllers/userCtrl');

router.get('/signup', signupCtrl.signup);
router.post('/register', userCtrl.register);
router.get('/request', signupCtrl.request); 




module.exports = router;
