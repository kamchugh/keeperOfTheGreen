module.exports = function (sequelize, DataTypes) {
    console.log("inside models/cart/define")

    var Cart = sequelize.define("Cart", {


        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        }

    },

    {
        classMethods: {
            associate: function (models) {
                Cart.belongsToMany(models.Product, {
                    through : {
                        model : models.Item
                    },
                    foreignKey: {
                        field : "cart_id",
                        allowNull: false
                    },

                });
                
            }
            
        }
    });


    return Cart;
}



