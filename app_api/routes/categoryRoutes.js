var express = require('express');
var router = express.Router();
var categoryCtrl = require('../controllers/categoryCtrl');

router.get('/', categoryCtrl.showAll);

 router.get('/:id', categoryCtrl.show);

router.post('/', categoryCtrl.create);

router.delete('/:id', categoryCtrl.destroy);

router.put('/:id', categoryCtrl.update);

module.exports = router;