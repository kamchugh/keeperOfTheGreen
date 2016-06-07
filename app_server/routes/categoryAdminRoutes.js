var express = require('express');
var router = express.Router();
var categoryCtrl = require('../../app_api/controllers/categoryCtrl');

router.get('/categories/show/all', categoryCtrl.showAll);

 router.get('/categories/show/:id', categoryCtrl.show);

router.post('/categories/create', categoryCtrl.create);

router.delete('/categories/delete/:id', categoryCtrl.destroy);

router.put('/categories/update/:id', categoryCtrl.update);

module.exports = router;