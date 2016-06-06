var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.home = function(req,res) {
	res.render('index', {user : req.user});
};

module.exports.login = function(req,res) {
	res.render('login')
};
