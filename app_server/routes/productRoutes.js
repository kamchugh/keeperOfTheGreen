var express = require('express');
var router = express.Router();
var productCtrlServer = require('../controllers/productCtrl');

router.get('/', productCtrlServer.productPage);

module.exports = router;

