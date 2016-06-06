module.exports = function(sequelize, DataTypes) {
  var cart_item = sequelize.define('cart_item', {
    // description: DataTypes.STRING
    title: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        cart_item.belongsTo(models.Cart, {
          onDelete: 'CASCADE',
          foreignKey: { notNull: true }
        });
      }
    }
  });

  return cart_item;
}
