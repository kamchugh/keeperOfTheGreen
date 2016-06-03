module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("products", {
        product_id : {
            type: DataTypes.INT,
            allowNull : false,
            unique : true
        },
        title :  DataTypes.STRING,

         price :  DataTypes.DECIMAL
        ,
         category : DataTypes.STRING
        ,
         description: DataTypes.STRING
        ,
         quantity : DataTypes.INTEGER
        ,
         img : DataTypes.STRING
       ,
        classMethods: {
            associate : function(models) {
                Product.hasMany(models.cart_item)

            }, {

                Product.hasMany(models.product_category)
        }
    });

    return Product;
}
