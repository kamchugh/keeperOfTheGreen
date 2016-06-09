// {
//     "fname" : "derp",

//     "lname" : "dez",

//     "address" : "1234 goefurslf",

//     "city" : "matt damon",

//     "state" : "CA",

//     "zip" : "92028",

//     "phone" : "8675309",

//     "email" : "wezdezndev@gmail.com",

//     "password" : "asdf",

//     "notes" : "I like turtles",

//     "credit" : "12341234134",

//     "img_url" : "blahblah.img"

// }





module.exports = function(sequelize, DataTypes) {
    console.log("inside models/users/define")

    var User = sequelize.define("User", {


        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement: true,
            primaryKey: true
        },


        fname : {
            type : DataTypes.STRING,
            allowNull : false


        },
        lname : {
            type : DataTypes.STRING,
            allowNull : false,


        },
        address : {
            type : DataTypes.STRING,
            allowNull : false,


        },
        city : {
            type : DataTypes.STRING,
            allowNull : false,


        },
        state : {
            type : DataTypes.STRING,
            allowNull : false,


        },
        zip : {
            type : DataTypes.INTEGER,
            allowNull : false,


        },
        phone : {
            type : DataTypes.INTEGER,
            allowNull : false,


        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,


        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,


        },
        notes : {
            type : DataTypes.STRING,
            allowNull : true,


        },
        credit : {
            type : DataTypes.INTEGER,
            allowNull : true,


        },
        img_url : {
            type : DataTypes.STRING,
            allowNull : true,

        }
    },

                                {
        classMethods: {
            associate : function(models) {
                User.hasOne(models.Cart)
                User.hasMany(models.Order)
            }

        }
    }


                               );

    return User;
}


// User
// .findAndCountAll(user)
// .then(function(result) {
// 	console.log(result.count);
// 	console.log(result.rows);
// });
