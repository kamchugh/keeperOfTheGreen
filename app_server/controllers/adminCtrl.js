var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');

module.exports.adminPage = function(req,res) {
	models.Category.findAll()
		.then(function(categories) {
			models.Product.findAll() 
			.then(function(products) {
			res.render('adminPage', {categories : categories, products : products})
			})
		})	
};