var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');

module.exports.productPage = function(req,res) {
	//console.log("THIS IS THE USER REQ OBJECT" + req.user.user_id);
	var guest = [];
	console.log(req.user);
	if (req.user == undefined) {
		userId = 1;
		guest.push(userId);
		console.log("USER IS UNDEFINED");
		// req.user.user_id == 1;
	}
	else {
		userId = req.user.user_id;
	}


			models.Cart.findOne({
				where : {
					UserUserId : userId
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
					models.Product.findAll({
						where : {
							quantity : {
								$gt : 0
							}
						},
					})
					.then(function(products) {
						console.log( "these are the products" + products);

						//res.render('productsPage', {user :req.user, items : items, products : products, total : total})

						res.render('productsPage', {user :req.user, items : items, products : products, total : total, guest : guest})

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

						res.render('shoppingcart', {products : cart.dataValues.Products, quantity : quantity, price : price, total : total})

		})
};
module.exports.cartRemoveItem = function(req,res) {
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
				models.Item.findOne( {
					where : {
						ProductId : product.id
					}
				})
				.then(function(item) {
					console.log("item has been passed");
					console.log("ITEM QUANTITY" + item.item_quantity);
					// item.update({'item_quantity' : item_quantity + 1 })
					item.decrement('item_quantity');
					console.log("DECREMENTED NUMBER: " + item.dataValues.item_quantity);
					if(item.dataValues.item_quantity == 1) {
						console.log("IN 0 IF STATEMENT");
						item.destroy();
					}

					res.redirect('/viewProducts/checkout');
				})
			 })
		})
}
module.exports.cartAddExtraItem = function(req,res) {
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

					res.redirect('/viewProducts/checkout');
				})
			 })
		})
}

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
					models.Product.findAll()
						.then(function(products) {
							// res.render('productsPage', {products : products});

						})



					console.log("onlyproductslength" + cart.dataValues.Products.length);
					console.log("unmatchedproductslength" + unmatchedProducts.length);
					res.redirect('/viewProducts');
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


				})
				.then(function(){
					models.Order.findOne({
						where : {
							UserUserId : req.user.user_id
						},
						include : [
							{all : true}
						]
					})

				.then(function(singleOrder){
					var orderItems = [];
							console.log("IM OUTSIDE OF THE PRODUCT LOOP")
							console.log(singleOrder.dataValues)
							console.log(singleOrder.id);
						for(var i = 0; i < singleOrder.dataValues.Products.length; i ++) {
							console.log("I GET INTO THE PRODUCT LOOP")
						var product = singleOrder.dataValues.Products[i];
						orderItems.push(product);
						console.log("CHECKING THE ORDER ITEM LIST");
						console.log(orderItems[0]);
						console.log(singleOrder.dataValues.Products[i].order_item.dataValues.item_quantity);
					}
					res.render('checkoutConfirmation', {singleOrder : singleOrder});
					})

				})

			})


};








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
