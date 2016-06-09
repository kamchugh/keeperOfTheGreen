module.exports = function (sequelize, DataTypes) {
    console.log("inside models/order/define")

    var Order = sequelize.define("Order", {


        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        }

    },
    {
        classMethods: {
            associate : function(models) {
                Order.belongsToMany(models.Product, {
                    through : {
                        model : models.order_item
                    },
                    // foreignKey: "ProductId"
                });
              }
            }
    });



    return Order;
}