module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        product_id : {
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
                    foreignKey: {
                        field: "product_id",
                        allowNull: false
                    }
                })
                Product.hasMany(models.product_category)
              }
            }
    });

    return Product;
}
