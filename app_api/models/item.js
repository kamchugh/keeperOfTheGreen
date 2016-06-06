module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    // description: DataTypes.STRING
    title: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Item.belongsTo(models.Cart, {
          onDelete: 'CASCADE',
          foreignKey: { notNull: true }
        });
      }
    }
  });

  return Item;
}