var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.get('/users', userCtrl.showAll);
router.get('/users/:id', userCtrl.getSpecificUser);
router.post('/users', userCtrl.create);
router.delete('/users', userCtrl.destroy);
router.put('/users', userCtrl.update);



module.exports = router;


