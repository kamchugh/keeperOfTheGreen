

module.exports = function(sequelize, DataTypes) {
    console.log("inside models/cart/define")

    var Cart = sequelize.define("Cart", {


        // cart_id : {
        //     type : DataTypes.INTEGER,
        //     allowNull : false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },


        cart_title : {
            type : DataTypes.STRING,
            allowNull : false
        }

    },

                                {
        classMethods: {
            associate : function(models) {
                Cart.belongsTo(models.User, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false
                    }
                });
            },
            associate : function(models) {
                Cart.hasMany(models.Item)
            }
        }
    }
                               );



    return Cart;
}
