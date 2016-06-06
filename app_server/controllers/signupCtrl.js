var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.signup = function(req,res) {
	res.render('signup');
	console.log("In signup controller");
};
