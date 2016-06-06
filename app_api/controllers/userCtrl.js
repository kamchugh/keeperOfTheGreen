var models = require('../models');

// npm install --save bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 13;




//CREATE USER
module.exports.create = function(req,res) {
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
            notes : req.body.notes,
            credit : req.body.credit,
            img_url : req.body.img_url,

        })
            .then(function(users) {
            res.sendStatus(201);
        })
            .catch(function(err) {
            res.status(500);
            res.send('InternalServerError: User not created');
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
module.exports.update = function(req,res) {
    var rawPassword = req.body.password;
    bcrypt.hash(rawPassword, saltRounds, function(err,hash){
        models.User.upsert({
            user_id : req.body.user_id,
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
            .then(function(user) {
            res.sendStatus(201);
        })
            .catch(function(err) {
            res.status(500);
            res.send('InternalServerError: User not created');
        });

    });
};



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

















