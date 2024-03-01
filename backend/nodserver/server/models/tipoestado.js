"use strict";
module.exports = (sequelize, DataTypes) => {
  const TipoEstado = sequelize.define(
    "TipoEstado",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "TipoEstado",
      tableName: "TipoEstado",
    }
  );
  TipoEstado.associate = function (models) {
    // associations can be defined here

    TipoEstado.hasMany(models.EstadoAlumno, {
      foreignKey: "tipoestadoId",
    });
 
  };
  return TipoEstado;
};
