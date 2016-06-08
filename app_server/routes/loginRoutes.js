var express = require('express');
var router = express.Router();
var loginCtrl = require('../controllers/loginCtrl');
var userCtrl = require('../../app_api/controllers/userCtrl');

router.get('/', loginCtrl.home);
router.get('/login', loginCtrl.login);
router.post('/authenticate', loginCtrl.authenticate);
router.get('/profile', loginCtrl.profile);
router.put('/updateUser', loginCtrl.updateUser);
// router.post('/register', loginCtrl.register);
 router.get('/logout', loginCtrl.logout);

module.exports = router;
