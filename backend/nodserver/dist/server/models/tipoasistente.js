"use strict";

module.exports = function (sequelize, DataTypes) {
  var TipoAsistente = sequelize.define("TipoAsistente", {
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
    modelName: "TipoAsistente",
    tableName: "TipoAsistente"
  });
  TipoAsistente.associate = function (models) {
    // associations can be defined here

    TipoAsistente.hasMany(models.AsistenteColegio, {
      foreignKey: "tipoasistenteId"
    });
  };
  return TipoAsistente;
};