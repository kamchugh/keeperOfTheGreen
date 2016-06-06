//EXPRESS SET UP
//npm init
//npm install --save express
var express = require('express');
var app = express();

//HANDLEBARS
//npm install --save express-handlebars
var handlebars = require('express-handlebars')
.create({
    defaultLayout: '../../app_server/views/layouts/main',
    partialsDir: "./app_server/views/partials/"
});
var path = require('path');
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');




//BODY PARSER
//npm install --save body-parser
var bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

//SQLIZE BP
app.use(bp.urlencoded({
    extended: false
}));


//COOKIES
//npm install --save cookie-parser
var cookie = require('cookie-parser');
var secret;
if (process.env.SECRET) {
    secret=process.env.SECRET;
} else {
    secret = require('./credentials').secret;
}
app.use(cookie(secret));


//SESSIONS
//npm install --save express-session
var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: secret,
    key: 'user'
}));




/////PASSPORT
// npm install --save passport
var passportConfig = require('./config/passportConfig');
app.use(passportConfig.initialize());
app.use(passportConfig.session());






/////// SEQUELIZE /////////////////////
// npm install --save sequelize
// npm install --save sequelize-cli
// npm install --save mysql
// node_modules/.bin/sequelize init


// PORT LINK UP
var port = process.env.PORT || 3000;

//MODELS AND USE ROUTS
var models = require('./app_api/models');
// app.use('/', require('./app_server/routes/loginRoutes'));
app.use('/', require('./app_server/routes/loginRoutes'));
app.use('/signup', require('./app_server/routes/signupRoutes'));
app.use('/users', require('./app_api/routes/userRoutes'));
app.use('/cart', require('./app_api/routes/cartRoutes'));


//SQLIZE SYNC WITH PORT
models.sequelize.sync()
    .then(function(){
    console.log('successfully synced db');
    app.listen(port, function(){
        console.log('listening on' + port);
    });
})
    .catch(function(err){
    console.error(err);
});


//SERVER DEFAULT

// app.listen(3000, function(){
// 	console.log('TEST TEST 123 listening on 3000');
// });
