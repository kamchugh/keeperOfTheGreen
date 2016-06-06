var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.home = function(req,res) {
	res.render('index', {user : req.users});
	console.log("In server controller");
};

module.exports.login = function(req,res) {
	res.render('login')
};

/// everything Kaylee added is below 

//authentification for login 

module.exports.authenticate = function(req,res) {
	console.log(req.body);
	passportConfig.authenticate('local', function(err,user,info){
		if (err || !user) {
			return res.redirect('/login');
		}
		req.login(user,function(err){
			return res.redirect('/');
		})
	})(req,res);
};

//logout function 
module.exports.logout = function(req,res) {
	req.logout();
	res.redirect('/login');
}
