var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.signup = function(req,res) {
	res.render('signup');
	console.log("In signup controller");
};
module.exports.register = function(req,res) {
  console.log("In Register for signup");
	bcrypt.hash(req.body.password, saltRounds, function(err,hash){
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
		 .then(function(users){
		 	console.log("user " + users.user_id);
                // models.Cart.create(cart);
                models.Cart.create({

                   UserUserId : users.user_id

               })
            })
			.then(function(user){
				req.login(user,function(err){
					return res.redirect('/');
				})
			});
	});
};
