
module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("employee", {
         position : DataTypes.STRING,
        is_admin : DataTypes.BOOLEAN
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
