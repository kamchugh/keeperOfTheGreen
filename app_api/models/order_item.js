module.exports = function(sequelize, DataTypes) {
  var order_item = sequelize.define('order_item', {
    // description: DataTypes.STRING
    title: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        order_item.belongsTo(models.Order, {
          onDelete: 'CASCADE',
          foreignKey: { notNull: true }
        });
      }
    }
  });

  return order_item;
}

