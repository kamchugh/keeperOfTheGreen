module.exports = function(sequalize, DataTypes) {
    var User = sequalize.define("User", {

        user_id : {
          type: DataTypes.INTEGER,
          allowNull : false,
          unique : true
        },
        fname : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        lname : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        address : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        city : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        state : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        zip : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        phone : {
          type : DataTypes.INTEGER,
          allowNull : false,
          unique : false

        },
        email : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        password : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        notes : {
          type : DataTypes.STRING,
          allowNull : true,
          unique : false

        },
        credit : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false

        },
        img_url : {
          type : DataTypes.STRING,
          allowNull : false,
          unique : false
        },
      },{
        //   classMethods: {
        //     associate : function(models) {
        //         User.hasMany(models.Cart)
        //   }
        // }
    });

    return User;
}
