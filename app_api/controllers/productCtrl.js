var models = require('../models');

// show all products
module.exports.showAll = function(req,res){
	models.User.findAll()
		.then(function(users){
			res.send(users);
		})
		.catch(function(err){
			console.error(err);
			res.status(500);
			res.send(err);
		});
};

// create a product

module.exports.create = function(req,res) {
    var product = req.body;
    models.Product.create(product)
        .then(function(product){
            res.redirect('admin')
        })
        .catch(function(err){
        	res.status(500);
        	res.send(err);
        });
};

// delete a product

module.exports.destroy = function(req,res){
	var id = req.body.id;
	models.Product.destroy({
		where : {
			id : id
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

// update a product

module.exports.update = function(req,res){

    var updatedProduct = req.body;
    models.Product.upsert(updatedProduct)
        .then(function(){
            res.sendStatus(202);
        });
};

// show a single product

module.exports.show = function(req,res){
	models.Product.findById(req.params.id, {
		include : [{
			model : models.cart_item,
			model : models.product_category
		}]
	})
		.then(function(product){
			res.send(product);
		})
};
