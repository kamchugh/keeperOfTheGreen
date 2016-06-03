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

    var rawPassword = req.body.password;
    bcrypt.hash(rawPassword, saltRounds, function(err,hash){
        models.User.create({
            fname : req.body.fname,
            lname : req.body.lname,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
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
  module.exports.delete = function(req,res){
	models.User.destroy({
		where: {
			id : req.params.user_id
		}
	})
		.then(function(){
			res.sendStatus(202);
		})
};
