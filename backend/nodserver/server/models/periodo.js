"use strict";
module.exports = (sequelize, DataTypes) => {
  const Periodo = sequelize.define(
    "Periodo",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el nombre del periodo",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Periodo",
      tableName: "Periodo",
    }
  );

  Periodo.associate = function (models) {
    // associations can be defined here

    Periodo.hasMany(models.Evaluacion, {
      foreignKey: "periodoId",
    });

    Periodo.hasMany(models.Nota, {
      foreignKey: "periodoId",
    });

  };
  return Periodo;
};
