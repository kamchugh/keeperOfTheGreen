var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/productCtrl');

router.get('/', productCtrl.showAll);

router.get('/:id', productCtrl.show);

router.post('/', productCtrl.create);

router.delete('/', productCtrl.destroy);

router.put('/', productCtrl.update);

module.exports = router;
