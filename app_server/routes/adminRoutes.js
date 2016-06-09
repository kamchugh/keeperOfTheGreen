var express = require('express');
var router = express.Router();
var categoryCtrlServer = require('../controllers/adminCtrl');
var categoryCtrl = require('../../app_api/controllers/categoryCtrl');

router.get('/', categoryCtrlServer.adminPage);

router.put('/updateCategory', categoryCtrlServer.update);

router.get('/editCategory', categoryCtrlServer.edit);

router.get('/showAllOrders', categoryCtrlServer.showAllOrders);

router.get('/viewSpecificOrder/:oid', categoryCtrlServer.viewSpecificOrder);

// router.post('/categories/create', categoryCtrl.create);

// router.delete('/categories/delete/:id', categoryCtrl.destroy);

// router.put('/categories/update/:id', categoryCtrl.update);

module.exports = router;
