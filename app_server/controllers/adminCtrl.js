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


module.exports.edit = function(req,res) {
	console.log("edit route");
	models.Category.findById(2)
		.then(function(category) {
			res.redirect('editCategory')
			})
};

module.exports.update = function(req,res){
	console.log("in update in app api");
    var updatedCategory = {
				cat_id : req.body.cat_id,
				cat_name : req.body.cat_name,
				description : req.body.description,
		}

    models.Category.upsert(updatedCategory)
        .then(function(){

        });
};
