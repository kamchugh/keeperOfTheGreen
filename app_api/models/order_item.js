module.exports = function(sequelize, DataTypes) {
  var order_item = sequelize.define('order_item', {
    // description: DataTypes.STRING

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    item_quantity : DataTypes.INTEGER
    // ProductId : DataTypes.INTEGER,
    // OrderId : DataTypes.INTEGER,
    // cart_id : { 
    //   type : DataTypes.INTEGER,
    //   allowNull : true,
    //   unique : false
    // },
    

  });

  return order_item;
}
