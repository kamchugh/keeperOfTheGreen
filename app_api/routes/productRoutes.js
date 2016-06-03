var express = require('express');
var router = require('./userRoutes');
var productCtrl = require('../controllers/productCtrl');

router.get('/', productCtrl.showAll);

router.get('/:id', productCtrl.show);

router.post('/', productCtrl.create);

router.delete('/:id', productCtrl.destroy);

router.put('/:id', productCtrl.update);

module.exports = router;