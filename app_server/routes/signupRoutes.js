var express = require('express');
var router = require('./loginRoutes');
var signupCtrl = require('../controllers/signupCtrl');

router.get('/signup', signupCtrl.signup);
router.post('/register', signupCtrl.register);



module.exports = router;
