module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        cat_name : {
            type: DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        description : DataTypes.STRING
    }, {
        classMethods: {
            associate : function(models) {
                Category.hasMany(models.Product_Category)
            }
        }
    });

    return Category;
}