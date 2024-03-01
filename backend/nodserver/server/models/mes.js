"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mes = sequelize.define(
    "Mes",
    {
      numero: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el numero del mes",
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el nombre del mes",
        },
      },
      abreviatura: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese la abreviatura del mes",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Mes",
      tableName: "Mes",
    }
  );

  Mes.associate = function (models) {
    Mes.hasMany(models.Asistencia, {
      foreignKey: "mesId",
    });

    Mes.hasMany(models.ControlAsignatura, {
      foreignKey: "mesId",
    });

    Mes.hasMany(models.RegistroActividad, {
      foreignKey: "mesId",
    });

  };

  return Mes;
};
