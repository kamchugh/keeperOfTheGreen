module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        id : {
            type: DataTypes.INTEGER,
            allowNull : false,
            autoIncrement: true,
            primaryKey: true
        },
        title :  DataTypes.STRING,

         price :  DataTypes.DECIMAL,

         category : DataTypes.STRING,

         description: DataTypes.STRING,

         quantity : DataTypes.INTEGER,

         img : DataTypes.STRING
},{
        classMethods: {
            associate : function(models) {
                Product.belongsToMany(models.Cart, {
                    through : {
                        model : models.Item
                    },


                    // this was it!
                    // foreignKey: {
                    //     field: "cart_id",
                    //     unique : false   
                    // }
                });
                Product.belongsToMany(models.Order, {
                    through : {
                        model : models.order_item
                    },
                    
                    // this was it!
                    // foreignKey: 'OrderId'  
                });
                Product.hasMany(models.product_category)
              }
            }
    });

    return Product;
}
