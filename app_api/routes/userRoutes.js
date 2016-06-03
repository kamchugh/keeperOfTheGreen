var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.get('/users', userCtrl.index);
router.post('/users', userCtrl.create);
router.delete('users/:user_id', userCtrl.delete);
router.put('users/:user_id', userCtrl.update); 

module.exports = router;
