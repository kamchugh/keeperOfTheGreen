var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var bcrypt = require('bcrypt');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

const saltRounds = 13;

module.exports.home = function(req,res) {
	console.log(req.user);
	res.render('index', {user : req.user});
	console.log("In server controller and in the home method");
};

module.exports.login = function(req,res) {
	res.render('login')
};

/// everything Kaylee added is below

//authentification for login

module.exports.authenticate = function(req,res) {
	console.log(req.body);
	console.log("In the authentication method");
	passportConfig.authenticate('local', function(err,user,info){
		if (err || !user) {
			console.log(err);
			console.log(user);
			console.log("error or no user");
			return res.redirect('/login');
		}
		req.login(user,function(err){
			if (err) return console.error(err);
			console.log(user);
			return res.redirect('/');
		})
	})(req,res);
};

//logout function
module.exports.logout = function(req,res) {
	req.logout();
	res.redirect('/');
};
module.exports.profile = function(req,res) {
	res.render('profile', {user : req.user});

};

module.exports.updateUser = function(req,res) {
	bcrypt.hash(req.body.password, saltRounds, function(err,hash){
		var user = {
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
		}

	models.User.upsert(user)
		.then(function(){

});
	 });
};

// module.exports.profileUpdate = function(req,res) {
//   console.log("Trying to update");
// 	bcrypt.hash(req.body.password, saltRounds, function(err,hash){
// 		var obj = {
// 			user_id : req.body.id,
// 			fname : req.body.fname,
// 			lname : req.body.lname,
// 			address : req.body.address,
// 			city : req.body.city,
// 			state : req.body.state,
// 			zip : req.body.zip,
// 			phone : req.body.phone,
// 			email : req.body.email,
// 			password : req.body.password,
// 		};
// 		 var jsonString = JSON.stringify(obj);
//
// 		 console.log(obj.fname);
// 		 console.log("I Just Got Through the Object");
//
//
// 		xhr.open('PUT', '/users');
//
// 		xhr.setRequestHeader('Content-type', 'application/json');
//
// 		xhr.onreadystatechange = function() {
// 			if (xhr.readyState === 4 && xhr.status < 400) {
//         console.log(xhr.status);
//         console.log(xhr.responseText);
//     }
//     if (xhr.readyState === 4 && xhr.status >= 400) {
//         console.error(xhr.status + ': ' + xhr.responseText);
//     }
// 		};
// 		xhr.send(jsonString);

			// .then(function(user){
			// 	req.login(user,function(err){
			// 		return res.redirect('/profile');
			// 	})
			// });
	// });
// };
