var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');

module.exports.adminPage = function(req,res) {
	models.Category.findAll()
		.then(function(categories) {
			res.render('adminPage', {categories : categories})
		})	
};