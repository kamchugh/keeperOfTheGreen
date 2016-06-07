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
                    Cart.belongsTo(models.Product, {
                        through : {
                            model : models.Item
                        },
                        onDelete: "CASCADE",
                        foreignKey: {
                            allowNull: false
                        }
                    });
                },
                associate: function (models) {
                    Cart.hasMany(models.Item)
                }
            }
        });


    return Cart;
}