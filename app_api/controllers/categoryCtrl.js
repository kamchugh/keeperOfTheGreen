var models = require('../models');

// show all categories
module.exports.showAll = function(req,res){
	models.Category.findAll()
		.then(function(categories){
			res.send(categories);
		})
		.catch(function(err){
			console.error(err);
			res.status(500);
			res.send(err);
		});
};

// create a category

module.exports.create = function(req,res) {
    var category = req.body;
    models.Category.create(category)
        .then(function(category){
            res.sendStatus(201);
        })
        .catch(function(err){
        	res.status(500);
        	res.send(err);
        });
};

// delete a category

module.exports.destroy = function(req,res){
	var id = req.params.id;
	models.Category.destroy({
		where : {
			product_id : id
		}
	})
	.then(function(){
		res.sendStatus(202);
	})
	.catch(function(err){
		res.status(500);
		res.send(err);
	})
};

// update a category

module.exports.update = function(req,res){
    var updatedCategory = req.body;
    models.Category.upsert(updatedCategory)
        .then(function(){
            res.sendStatus(202);
        });
}; 

