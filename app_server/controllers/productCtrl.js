var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');

// module.exports.productPage = function(req,res) {
// 	models.Product.findAll()
// 		.then(function(products) {
// 			// somewhere in here say "if cart.user_id == user.user_id grab that cart"
// 			res.render('productsPage', {products : products})
// 			// somehow also render cart 
// 		})	
// };


// module.exports.productPage = function(req,res) {
// 	models.Product.findAll()
// 		.then(function(products) {
// 			models.Cart.findAll({
// 				where : {
// 					user_id : req.user.user_id
// 				}
// 			}) 
// 			.then(function(cart) {
// 				console.log(cart.user_id)
// 			res.render('adminPage', {categories : categories, products : products})
// 			})
// 		})	
// };

module.exports.productPage = function(req,res) {
	console.log("user req object" + req.user.user_id);
			models.Cart.findOne({
				where : {
					UserUserId : req.user.user_id
				}
			}) 
			.then(function(cart) {
				console.log("cart user id" + cart.UserUserId);
				models.Item.findAll( {
					where : {
						CartId : cart.id
					}
				})
				.then(function(items) {
					var total = 0;
					for(var i = 0; i < items.length; i ++) {
						total += items[i].item_quantity
						console.log(items[i]);
					}
					console.log("total" + total);
					models.Product.findAll()
					.then(function(products) {
						console.log( "these are the products" + products);
						res.render('productsPage', {items : items, products : products, total : total})
					})
			})	
		})
};

module.exports.checkoutPage = function(req,res) {
	console.log("user req object" + req.user.user_id);
			models.Cart.findOne({
				where : {
					UserUserId : req.user.user_id
				},
				include : [
						models.Product
					]
			}) 
			.then(function(cart) {
				console.log(cart.dataValues.Products[0].dataValues);
				console.log("quantity of 0" + cart.dataValues.Products[0].dataValues.Item.dataValues.item_quantity);
				console.log("price of 0" + cart.dataValues.Products[0].dataValues.price);
	
					var quantity = 0;
					var price = 0;
					var total = 0;
					for(var i = 0; i < cart.dataValues.Products.length; i ++) {
						quantity += cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity
						 price += cart.dataValues.Products[i].dataValues.price
						total =  total + (quantity * price)
						console.log("item quantity value I'M IN THE LOOP " + cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity);
					}
					

						//console.log( "these are the products" + products);
						res.render('shoppingcart', {products : cart.dataValues.Products, quantity : quantity, price : price, total : total})
			// 		 })
			// })	
		})
};


module.exports.createOrder = function(req,res) {
	        models.Order.create({
            fname : req.body.fname,
            lname : req.body.lname,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            phone : req.body.phone,
            email : req.body.email,
            password : hash,
            notes : req.body.notes,
            credit : req.body.credit,
            img_url : req.body.img_url,

        })

};


