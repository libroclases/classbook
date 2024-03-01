"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ventana = sequelize.define(
    "Ventana",
    {
      dias: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Ventana",
      tableName: "Ventana",
    }
  );

  Ventana.associate = function (models) {
    // associations can be defined here

    Ventana.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    Ventana.belongsTo(models.Tabla, {
      foreignKey: "tablaId",
    });


  };
  return Ventana;
};
