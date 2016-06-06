module.exports = function(sequelize, DataTypes) {
	var order_item = sequelize.define('order_item', {
		order_id: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
		quantity: DataTypes.INTEGER
	});

	return order_item;
}