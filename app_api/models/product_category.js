
module.exports = function(sequelize, DataTypes) {
    var product_category = sequelize.define("product_category", {
        product_id : DataTypes.INT
    },
         cat_id : DataTypes.INT
    },
     {
        classMethods: {
            associate : function(models) {
                product_category.belongsTo(models.Product, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false // must be associated
                    }
                });
                 product_category.belongsTo(models.Category, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false // must be associated
                    }
                });
            }
        }
    });

    return product_category;
}