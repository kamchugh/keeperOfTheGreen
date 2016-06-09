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
		res.redirect('admin')
	})
	.catch(function(err){
		res.status(500);
		res.send(err);
	})
};

// update a product

module.exports.update = function(req,res) {
		var prod = {
			id : req.body.id,
			title : req.body.title,
			price : req.body.price,
			category : req.body.category,
			description : req.body.description,
			quantity : req.body.quantity,
			img : req.body.img,
		}

	models.Product.upsert(prod)
		.then(function(){

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
