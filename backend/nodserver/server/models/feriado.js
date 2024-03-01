"use strict";
module.exports = (sequelize, DataTypes) => {
  const Feriado = sequelize.define(
    "Feriado",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el nombre del feriado",
        },
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: false,
          msg: "Por favor ingrese la fecha del feriado",
        },
      },
      lugar: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: {
          args: false,
          msg: "Por favor ingrese el lugar del feriado",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Feriado",
      tableName: "Feriado",
    }
  );

  Feriado.associate = function (models) {

  };

  return Feriado;
};
