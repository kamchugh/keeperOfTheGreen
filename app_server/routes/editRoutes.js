var express = require('express');
var router = require('./loginRoutes');
var server = require('../controllers/editCtrl');

router.get('/editCategory:id', server.edit);
router.put('/updateCategory', server.update);


module.exports = router;
