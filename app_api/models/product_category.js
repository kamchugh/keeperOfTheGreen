
module.exports = function(sequelize, DataTypes) {
    var product_category = sequelize.define("product_category", {
        // product_id : DataTypes.INTEGER,
        //  cat_id : DataTypes.INTEGER
      }
      ,{
        classMethods: {
            associate : function(models) {
                product_category.belongsTo(models.Product, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false
                    }
                });
                 product_category.belongsTo(models.Category, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false
                    }
                });
            }
         }
    });

    return product_category;
}
