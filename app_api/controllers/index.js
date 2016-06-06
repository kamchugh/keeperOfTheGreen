
var models = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.index = function(req, res) {
  console.log("Controller Route Hit");

  res.send("In Controller"); 

}
