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
			res.render('productsPage', {items : items})
			})	
		})
};



