// var passportConfig = require('../../config/passportConfig');
// var models = require('../../app_api/models');

// module.exports.adminPage = function(req,res) {
// 	models.Category.findAll()
// 		.then(function(employees) {
// 			models.Product.findAll() 
// 			.then(function(employees) {
// 			res.render('adminPage', {categories : categories, products : products})
// 			})
// 		})	
// };

var express = require('express');
var router = express.Router();
var productCtrlServer = require('../../app_api/controllers/employeeCtrl');

// view all products from the server
 //router.get('/', productCtrlServer.productPage);



module.exports = router;