var models = require('../models');

// npm install --save bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 13;




//CREATE USER
module.exports.register = function(req,res) {
    console.log("inside create user");
    var rawPassword = req.body.password;
    bcrypt.hash(rawPassword, saltRounds, function(err,hash){
        models.User.create({
            fname : req.body.fname,
            lname : req.body.lname,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            phone : req.body.phone,
            email : req.body.email,
            password : hash,

        })
            .then(function(user) {
              req.login(user,function(err){
                return res.redirect('/');
              })
        });
    });
};


//SHOW ALL USERS
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


//GET SPECIFIC USER
module.exports.getSpecificUser = function(req,res){
    models.User.findById(req.params.id)
        .then(function(users){
        res.json(users);
    })
        .catch(function(err){
        console.error(err);
        res.status(500);
        res.send(err);
    });
};



//UPDATE USER
// module.exports.profileUpdate = function(req,res) {
//   console.log("Trying to update from user");
//     bcrypt.hash(req.body.password, saltRounds, function(err,hash){
//         models.User.upsert({
//             user_id : req.body.user_id,
//             fname : req.body.fname,
//             lname : req.body.lname,
//             address : req.body.address,
//             city : req.body.city,
//             state : req.body.state,
//             zip : req.body.zip,
//             phone : req.body.phone,
//             email : req.body.email,
//             password : req.body.password,
//
//         })
//             .then(function(user) {
//               req.login(user,function(err){
//                 return res.redirect('/profile');
//               })
//         });
//     });
// };



//DESTROY USER
module.exports.destroy = function(req,res){
    console.log("inside destroy user. id: " + req.params.user_id);
    models.User.destroy({
        where: {
            user_id : req.body.user_id
        }
    })
        .then(function(){
        res.sendStatus(202);
    })
        .catch(function (err) {
        res.status(500);
        res.send(err);
    })
};
