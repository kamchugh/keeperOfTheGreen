var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.get('/', userCtrl.showAll);
router.get('/:id', userCtrl.getSpecificUser);
router.post('/', userCtrl.create);
router.delete('/', userCtrl.destroy);
router.put('/', userCtrl.update);



module.exports = router;


