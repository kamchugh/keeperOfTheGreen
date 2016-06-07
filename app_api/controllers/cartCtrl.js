var models = require('../models');



// //SHOW SPECIFIC TASK
// //users/:id/tasks/:tid;
// module.exports.showSpecificTask = function (req, res) {


// var task = req.body;
// task.UserId = req.params.id;
// task.id = req.params.tid


// User.findById(UserId)
//     .then(function (user) {
//         models.task.findById(task.id)
//             .then(function () {
//                 res.json(user);
//             })
//     })
// };




// //An example of how to create a new Task is:

// // assume POST /users/:id/tasks

// module.exports.addTask = function(req,res){
//     var task = req.body;
//     task.UserId = req.params.id; // add the UserId to the Task

//     models.Task.create(task) // create the Task
//         .then(function(task){
//             models.User.findById(req.params.id) // find the User
//                 .then(function(user){
//                     user.addTask(task) // add the task to the user
//                         .then(function(){
//                             res.json(user);
//                         })
//                 })
//         })
// };









//////CREATE A CART
// //cart_id
// module.exports.cartInit = function (req, res) {
//     console.log("inside cart title: " + req.body.cart_title);

//     console.log("inside cart init: " + req.params.uid);
//     models.Cart.create({
//         cart_title : req.body.cart_title,
//         UserIdUserId : req.params.uid

//     })

//         .then(function (cart) {
//         models.User.findById(req.params.uid)
//             .then(function (user) {
//             user.createCart(cart)
//                 .then(function () {
//                 res.sendStatus(201);
//             })
//                 .catch(function(err){
//                 console.error(err);
//                 res.status(500);
//                 res.send(err);
//             });
//         })
//     })
// };




console.log("inside cart controller")

//SHOW ALL ITEMS
module.exports.showAllItems = function(req,res){

    models.User.findById(req.params.uid)
    .then(function(user){
        models.Cart.findById(req.params.cid)
        .then(function(carts){
            res.json(carts);
        })
        .catch(function(err){
            console.error(err);
            res.status(500);
            res.send(err);
        });
    })
};


// router.post('/:uid/:cid/:pid', cartCtrl.cartAddProduct);
// module.exports.cartAddProduct = function(req,res){

//     var item = req.body;
//     item.CartId = req.params.cid;



//     models.User.findById(req.params.uid)
//     .then(function(user){
//         console.log("user thats found -------- " + user.fname);
//         models.Cart.findById(req.params.cid)
//         .then(function(cart){
//             console.log("cart thats found -------- " + cart.cart_id);
//             models.Product.findById(req.params.pid)

//             .then(function(product){
//                 console.log("product thats found -------- " + product.title);
//                 cart.addItem(item);
//                 res.json(item);
//             })                   
//         })
//     })
//     .catch(function(err){
//         console.error(err);
//         res.status(500);
//         res.send(err);
//     });
// };





module.exports.cartAddProduct = function(req,res){

    var item = req.body;
    item.CartId = req.params.cid;

    models.Item.create(item)
    .then(function(item){
        res.sendStatus(201);
    })    
    .catch(function(err){
        console.error(err);
        res.status(500);
        res.send(err);
    });
};




































// module.exports.addTask = function(req,res){
//     var task = req.body;
//     task.UserId = req.params.id; // add the UserId to the Task

//     models.Task.create(task) // create the Task
//         .then(function(task){
//             models.User.findById(req.params.id) // find the User
//                 .then(function(user){
//                     user.addTask(task) // add the task to the user
//                         .then(function(){
//                             res.json(user);
//                         })
//                 })
//         })

// };





// //DESTROY TASK
// module.exports.destroyTask = function(req,res){
//     models.Task.destroy({
//         where: {
//             id : req.params.tid
//         }
//     })
//         .then(function(){
//         res.sendStatus(202);
//     })
// };
