"use strict";

module.exports = function (sequelize, DataTypes) {
  var Ventana = sequelize.define("Ventana", {
    dias: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "Ventana",
    tableName: "Ventana"
  });
  Ventana.associate = function (models) {
    // associations can be defined here

    Ventana.belongsTo(models.Colegio, {
      foreignKey: "colegioId"
    });
    Ventana.belongsTo(models.Tabla, {
      foreignKey: "tablaId"
    });
  };
  return Ventana;
};