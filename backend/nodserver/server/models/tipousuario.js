"use strict";
module.exports = (sequelize, DataTypes) => {
  const TipoUsuario = sequelize.define(
    "TipoUsuario",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el nombre del tipo de usuario",
        },
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese la descripción del tipo de usuario",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "TipoUsuario",
      tableName: "TipoUsuario",
    }
  );
  TipoUsuario.associate = function (models) {
    // associations can be defined here

    TipoUsuario.hasMany(models.Usuario, {
      foreignKey: "tipousuarioId",
    });
  };
  return TipoUsuario;
};
