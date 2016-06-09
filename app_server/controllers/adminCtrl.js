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


module.exports.showAllOrders = function(req,res) {
	var orders = [];
	models.User.findAll(
	{
		include : [
		models.Order
		
		]
	}) 
		.then(function(users) {
			
			for(var i = 0; i < users.length; i ++) {
			console.log("ORDER INFO" + users[i].dataValues.Orders[0].UserUserId)
				for(var j = 0; j < users[i].dataValues.Orders.length; j ++) {
					console.log("IN SECOND LOOP: " + j);
					console.log(users[i].dataValues.Orders[j].UserUserId);
					orders.push(users[i].dataValues.Orders[j]);
				}
			}
			console.log(orders);
		})
			res.render('adminOrders', { orders : orders})
			
};

module.exports.viewSpecificOrder = function(req,res) {
	var orderItems = [];
	console.log("FIND SPECIFIC ORDER ROUTE");
	console.log("THIS IS THE ID I HAVE : " + req.params.oid);
	models.Order.findOne({
		where : {
			id : req.params.oid
		},
		include : [
		models.Product
		]
	})
		.then(function(singleOrder) {
			for(var i = 0; i < singleOrder.dataValues.Products.length; i ++) {
				var product = singleOrder.dataValues.Products[i];
				orderItems.push(product);
				console.log("ORDER ITEM QUANTITY")
				console.log(singleOrder.dataValues.Products[i].order_item.dataValues.item_quantity);
			}

			console.log("orderITEMSARRAY: "  + orderItems);
			res.render('adminOrders', {orderItems : orderItems})
			})
};
