

module.exports = function(sequelize, DataTypes) {
    console.log("inside models/cart/define")

    var Order = sequelize.define("Order", {


        // order_id : {
        //     type : DataTypes.INTEGER,
        //     allowNull : false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },


        order_title : {
            type : DataTypes.STRING,
            allowNull : false
        }

    },

                                {
        classMethods: {
            associate : function(models) {
                Order.belongsTo(models.User, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false
                    }
                });
            },
            associate : function(models) {
                Order.hasMany(models.order_item)
            }
        }
    }
                               );



    return Order;
}
