"use strict";

module.exports = function (sequelize, DataTypes) {
  var TipoEstado = sequelize.define("TipoEstado", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your name"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "TipoEstado",
    tableName: "TipoEstado"
  });
  TipoEstado.associate = function (models) {
    // associations can be defined here

    TipoEstado.hasMany(models.EstadoAlumno, {
      foreignKey: "tipoestadoId"
    });
  };
  return TipoEstado;
};