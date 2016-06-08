var express = require('express');
var router = express.Router();
var productCtrlServer = require('../controllers/productCtrl');

// view all products from the server
 router.get('/', productCtrlServer.productPage);

router.get('/checkout', productCtrlServer.checkoutPage);

router.get('/createOrder', productCtrlServer.createOrder);

module.exports = router;

