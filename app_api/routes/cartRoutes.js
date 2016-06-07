var express = require('express');
var router = express.Router();
var cartCtrl = require('../controllers/cartCtrl');



///////CARTS /////////



router.get('/:uid/:cid', cartCtrl.showAllItems);



//ADD PRODUCT TO CART
router.post('/', cartCtrl.cartAddProduct);


//CREATE A CARTrouter.post('/:uid', cartCtrl.cartInit);
// 




// router.post('/:uid/:cid/:', taskCtrl.addItem);
// router.put('/:uid/:cid/:iid', taskCtrl.updateItem);
// router.delete('/:uid/:cid/:iid', taskCtrl.destroyItem);


console.log("in cart router");


module.exports = router;




// module.exports.setCookie = function(req,res){
//     console.log("inside setCookie");
//     var body = req.body;
//     var list = [];
//     if (req.signedCookies.list) {
//         var found = false;
//         list = req.signedCookies.list;

//         list.forEach(function(val,index,array){
//             if(body.id == val.id){
//                 found = true;
//                 var quant = parseInt(body.quantity);
//                 var valquant = parseInt(val.quantity);
//                 val.quantity = quant + valquant;
//             }

//             var totes = val.quantity * val.price;
//             console.log(totes);

//         });

//         if (!found) {
//             list.push(body);
//         }

//         res.cookie('list', list, {signed : true});
//         res.send(list);
//     } else {
//         list.push(body);
//         res.cookie('list', list, {signed:true});
//         res.send(list);
//     }
// };


// router.post('/:uid/tasks', taskCtrl.create);

// module.exports.create = function(req,res){
// 	models.Task.create({
// 		title : req.body.title,
// 		UserId : req.params.uid
// 	})
// 		.then(function(task){
// 			models.User.findById(req.params.uid)
// 				.then(function(user){
// 					user.addTask(task)
// 						.then(function(){
// 							res.sendStatus(201);
// 						});
// 				});
// 		});
// };


















