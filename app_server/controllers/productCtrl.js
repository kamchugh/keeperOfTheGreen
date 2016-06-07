var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');

module.exports.productPage = function(req,res) {
	models.Product.findAll()
		.then(function(products) {
			res.render('productsPage', {products : products})
		})	
};