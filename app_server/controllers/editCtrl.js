var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');

module.exports.edit = function(req,res) {
	console.log("edit route");
	var id = req.params.id;
	models.Category.findById(req.params.id)

		.then(function(category) {
			res.render('edit', {category : category})
			})
			console.log(id);
};

module.exports.update = function(req,res) {
		var cat = {
			id : req.body.id,
			cat_name : req.body.cat_name,
			description : req.body.description,

		}

		console.log(cat);

	models.Category.upsert(cat)
		.then(function(){

});
};

module.exports.editProduct = function(req,res) {
	console.log("edit product route");
	var id = req.params.id;
	models.Product.findById(req.params.id)

		.then(function(product) {
			res.render('edit', {product : product})
			})
			console.log(id);
};
