var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/productCtrl');

router.get('/', productCtrl.showAll);

router.get('/:id', productCtrl.show);

router.post('/', productCtrl.create);

router.delete('/deleteProduct', productCtrl.destroy);

router.put('/updateProduct', productCtrl.update);

module.exports = router;
