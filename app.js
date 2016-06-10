//EXPRESS SET UP
//npm init
//npm install --save express
var express = require('express');
var app = express();
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

var passportConfig = require('./config/passportConfig');

//HANDLEBARS
//npm install --save express-handlebars
var handlebars = require('express-handlebars')
.create({
    defaultLayout: '../../app_server/views/layouts/main',
    partialsDir: './app_server/views/partials/'
});
var path = require('path');
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.use(express.static(__dirname + '/app_server/views/public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/////// SEQUELIZE /////////////////////
// npm install --save sequelize
// npm install --save sequelize-cli
// npm install --save mysql
// node_modules/.bin/sequelize init


// PORT LINK UP
var port = process.env.PORT || 3000;


//BODY PARSER
//npm install --save body-parser
var bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));







/////PASSPORT
// npm install --save passport
app.use(passportConfig.initialize());
app.use(passportConfig.session());


//MODELS AND USE ROUTS
var models = require('./app_api/models');
// app.use('/', require('./app_server/routes/loginRoutes'));
app.use('/', require('./app_server/routes/loginRoutes'));
app.use('/register', require('./app_api/routes/userRoutes'));
app.use('/users', require('./app_api/routes/userRoutes'));
app.use('/cart', require('./app_api/routes/cartRoutes'));
app.use('/product', require('./app_api/routes/productRoutes'));
app.use('/categories', require('./app_api/routes/categoryRoutes'));
app.use('/admin', require('./app_server/routes/adminRoutes'));
app.use('/viewProducts', require('./app_server/routes/productRoutes'));
app.use('/employee', require('./app_api/routes/employeeRoutes'));
app.use('/profileUpdate', require('./app_server/routes/loginRoutes'));
app.use('/profile', require('./app_server/routes/loginRoutes'));
app.use('/updateCategory', require('./app_server/routes/adminRoutes'));
app.use('/', require('./app_server/routes/editRoutes'));
// app.use('/editProduct', require('./app_server/routes/editRoutes'));
app.use('/signup', require('./app_server/routes/signupRoutes'));
app.use('/deleteCategory', require('./app_api/routes/productRoutes'));
app.use('/', require('./app_api/routes/productRoutes'));
app.use('/requestProduct', require('./app_server/routes/productRoutes'));

//SQLIZE SYNC WITH PORT
models.sequelize.sync()
// {force : true}

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
