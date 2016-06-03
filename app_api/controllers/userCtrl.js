var models = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.index = function(req,res){
	models.User.findAll({
		include : [{
			model : models.Task
		}]
	})
		.then(function(users){
			res.send(users);
		})
		.catch(function(err){
			console.error(err);
			res.status(500);
			res.send(err);
		});
};
module.exports.create = function(req,res) {
	var user = req.body;
    var rawPassword = user.password;

    bcrypt.hash(rawPassword, saltRounds, function(err,hash){
        models.User.create({
            username : user.username,
            password : hash
        })
            .then(function(user) {
                res.sendStatus(201);
            })
            .catch(function(err) {
                res.status(500);
                res.send('InternalServerError: User not created');
            });

    });
