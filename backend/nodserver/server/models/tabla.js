"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tabla = sequelize.define(
    "Tabla",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el nombre de la tabla (minúscula)",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Tabla",
      tableName: "Tabla",
    }
  );

  Tabla.associate = function (models) {
    // associations can be defined here

    Tabla.hasMany(models.Ventana, {
      foreignKey: "tablaId",
    });

  };
  return Tabla;
};
