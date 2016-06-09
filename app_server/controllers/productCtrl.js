var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');

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
						quantity = cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity
						 price += cart.dataValues.Products[i].dataValues.price
						 console.log("quantity * price" + quantity * price);
						total =  total + (quantity * price)
						console.log("total in " + i + "iteration of the looop" + total);
						console.log("item quantity value I'M IN THE LOOP " + cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity);
					}
					

						//console.log( "these are the products" + products);
						res.render('shoppingcart', {products : cart.dataValues.Products, quantity : quantity, price : price, total : total})
			// 		 })
			// })	
		})
};

module.exports.cartAddItem = function(req,res) {
	models.Cart.findOne({
				where : {
					UserUserId : req.user.user_id
				},
				include : [
						models.Product
					]
			})
			.then(function(cart) { 
				models.Product.findById(req.params.pid)
				.then (function(product) {
					console.log(cart.dataValues.Products);
					//if not in cart 
					var unmatchedProducts = [];
					for(var i = 0; i < cart.dataValues.Products.length; i ++) {
						if(cart.dataValues.Products[i].dataValues.id != product.id) {
							unmatchedProducts.push(i);
						}
						if(cart.dataValues.Products[i].dataValues.id == product.id) {
								 	console.log("I've matched an id");
								 	console.log(cart.dataValues.Products[i].dataValues.Item.dataValues);
								 	console.log("current quantity" + cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity);
								 	models.Item.findOne( {
								 		where : {
								 			ProductId : product.id
								 		}
								 	})
								 	.then(function(item) {
								 		console.log("item has been passed");
								 		console.log("ITEM QUANTITY" + item.item_quantity);
								 		// item.update({'item_quantity' : item_quantity + 1 })
								 		item.increment('item_quantity');
								 	})

								 }

					}

					if (cart.dataValues.Products.length == unmatchedProducts.length ) {
						cart.addProduct(product, {item_quantity : 1})
					}

					console.log("onlyproductslength" + cart.dataValues.Products.length);
					console.log("unmatchedproductslength" + unmatchedProducts.length);
					res.render('productsPage');
			// 		 })
			 })	
		})
};


module.exports.createOrder = function(req,res) {
		models.Cart.findOne({
				where : {
					UserUserId : req.user.user_id
				},
				include : [
						models.Product
					]
			})
			.then(function(cart) {
					models.Order.create({  
					order_title : "order title",        
		           	UserUserId : req.user.user_id, 
		        })
				.then(function(order) {
					console.log("ORDER ID" + order.UserUserId);
				for(var i = 0; i < cart.dataValues.Products.length; i ++) {
					 var quantity = cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity;
					 console.log('PRODUCTS IN CART:' + cart.dataValues.Products[i]);
					 var product = cart.dataValues.Products[i];
					 var item = cart.dataValues.Products[i].dataValues.Item;
					console.log(product);
					// this is where it's breaking 
					 order.addProduct(product, {item_quantity : quantity});
					 product.decrement(['quantity'], {by : quantity})
					 item.destroy();
					 //{item_quantity : quantity}
				}
				res.render('shoppingcart');
				})

			})


};


