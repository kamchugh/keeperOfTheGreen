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

// module.exports.cartAddItem = function(req,res){
	
// 		models.Cart.findOne({
// 				where : {
// 					UserUserId : req.user.user_id
// 				},
// 				include : [
// 						models.Product
// 					]
// 			})
// 			.then(function(cart) { 
// 				models.Product.findById(req.params.pid)
// 				.then (function(product) {
// 					console.log(cart.dataValues.Products);
// 					//if not in cart 
// 					var unmatchedProducts = [];
// 					for(var i = 0; i < cart.dataValues.Products.length; i ++) {
// 						if(cart.dataValues.Products[i].dataValues.id != product.id) {
// 							unmatchedProducts.push(i);
// 						}
// 						if(cart.dataValues.Products[i].dataValues.id == product.id) {
// 								 	console.log("I've matched an id");
// 								 	console.log(cart.dataValues.Products[i].dataValues.Item.dataValues);
// 								 	console.log("current quantity" + cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity);
// 								 	models.Item.findOne( {
// 								 		where : {
// 								 			ProductId : product.id
// 								 		}
// 								 	})
// 								 	.then(function(item) {
// 								 		console.log("item has been passed");
// 								 		console.log("ITEM QUANTITY" + item.item_quantity);
// 								 		// item.update({'item_quantity' : item_quantity + 1 })
// 								 		item.increment('item_quantity');
// 								 	})

// 								 }

// 					}

// 					if (cart.dataValues.Products.length == unmatchedProducts.length ) {
// 						cart.addProduct(product, {item_quantity : 1})
// 					}

// 					console.log("onlyproductslength" + cart.dataValues.Products.length);
// 					console.log("unmatchedproductslength" + unmatchedProducts.length);
// 					res.render('productsPage');
// 					//cart.addProduct(product, {item_quantity : 1})
// 					//if it is in cart then get quantity and add 1

// 					// .then(function(returnedProduct) {
// 					// 	console.log("IN THEN!!!!");
// 					// 	console.log(returnedProduct);
// 					// 	if(returnedProduct.length <= 1) {
// 					// 		throw new Error("Product Exists");
// 					// 	}
// 					// }) 
// 					.catch (function(err) {
// 					if (err.message == "Product Exists") {
// 						console.log("IN CONDITIONAL IN CATCH")
// 						console.log(product);
// 						console.log("PRODUCT ID" + product.id);
// 						console.log("LOOP ID" + cart.dataValues.Products[0].dataValues.id);
// 							for(var i = 0; i < cart.dataValues.Products.length; i ++) {
// 								console.log(cart.dataValues.Products[i].dataValues.id);
// 								 if(cart.dataValues.Products[i].dataValues.id == product.id) {
// 								 	console.log("I've matched an id");
// 								 	console.log(cart.dataValues.Products[i].dataValues.Item.dataValues);
// 								 	console.log("current quantity" + cart.dataValues.Products[i].dataValues.Item.dataValues.item_quantity);
// 								 	models.Item.findOne( {
// 								 		where : {
// 								 			ProductId : product.id
// 								 		}
// 								 	})
// 								 	.then(function(item) {
// 								 		console.log("item has been passed");
// 								 		console.log("ITEM QUANTITY" + item.item_quantity);
// 								 		// item.update({'item_quantity' : item_quantity + 1 })
// 								 		item.increment('item_quantity');
// 								 	})

// 								 }
					
// 						}
// 						// Iterate over products to find one you tried to associate
// 						// access the item_quantity from the nested Item
// 						// use increment (or increment yourself with update) the 
// 						// item_quantity by the quantity from the request object
// 						// return some sort of confirmation to the view						



// 					}
// 			        res.status(500);
// 			        res.send(err);

// 					})

// 				})

// 			// 	console.log("I GET INTO THE CART FUNCTION");
// 			// 	console.log(cart.dataValues.Products[0].dataValues.Item.dataValues);
// 			// for(var i = 0; i < cart.dataValues.Products.length; i ++) {
// 			// 		console.log("PRODUCT ID" + cart.dataValues.Products[i].dataValues.Item.dataValues.ProductId);
// 			// 		if(cart.dataValues.Products[i].dataValues.Item.ProductId == req.params.pid) {
// 			// 			var quantity = cart.dataValues.Products[i].dataValues.Item.item_quantity;
// 			// 				console.log("IM IN THE LOOOOOOOOOP" + cart.dataValues.Products[i].dataValues.Item.item_quantity);
// 			// 					models.Item.upsert({"item_quantity" : quantity + 1})
// 			// 					res.render('productsPage');
// 			// 			}

				
// 			// }

// 			})


//     // var item = {"item_quantity" : 1, "CartId" : req.user.user_id, "ProductId" : req.params.pid};
    

//     // models.Item.create(item)
//     // .then(function(item){
//     //     res.render('productsPage', {item : item});
			
//     // })    
//     .catch(function(err){
//         console.error(err);
//         res.status(500);
//         res.send(err);
//     });
// };



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


