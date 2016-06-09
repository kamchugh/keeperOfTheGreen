var express = require('express');
var router = express.Router();
var productCtrlServer = require('../controllers/productCtrl');


// view all products from the server
 router.get('/', productCtrlServer.productPage);

router.get('/checkout', productCtrlServer.checkoutPage);

router.get('/createOrder', productCtrlServer.createOrder);

router.get('/createCartItem/:pid', productCtrlServer.cartAddItem);

router.put('/updateProduct', productCtrlServer.update);

router.get('/removeItem/:pid', productCtrlServer.cartRemoveItem);

router.get('/addExtraItem/:pid', productCtrlServer.cartAddExtraItem);




// router.put('/updateProduct', productCtrlServer.cartAddItem);

module.exports = router;
