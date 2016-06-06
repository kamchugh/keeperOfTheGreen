var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../app_api/models');

var bcrypt = require('bcrypt');
passport.use(new LocalStrategy(
    function(username,password,callback){
        models.User.findOne({ 
            where : {
                username : username
            }
        })
        .then(function(user){
            if (!user) {
                return callback(null,false); 
            }

            // replace the previous password comparison with this
            bcrypt.compare(password,user.password,function(err,result){
                if (err || !result) {
                    return callback(null,false);
                }
                return callback(null, user); 
            });

        })
        .catch(function(err){
            return callback(err); 
        });
    }));

// serialize will be passed a user 'id' and store it in session
passport.serializeUser(function(user,callback){
    callback(null, user.id);
});

// deserialize will take the 'id' from the session and retrieve the user
// object from the database, making it available on the request object
// with req.user
passport.deserializeUser(function(id,callback){
    models.User.findById(id)
    .then(function(user){
        callback(null,user);
    })
    .catch(function(err){
        callback(err);
    });
});

module.exports = passport;