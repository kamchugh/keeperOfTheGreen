
module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
         position : DataTypes.STRING,
        is_admin : DataTypes.BOOLEAN,
        UserUserId: DataTypes.INTEGER
    },
     {
        classMethods: {
            associate : function(models) {
                Employee.belongsTo(models.User, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false // must be associated
                    }
                });
            }
        }
    });

    return Employee;
}
