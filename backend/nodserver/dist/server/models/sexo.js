"use strict";

module.exports = function (sequelize, DataTypes) {
  var Sexo = sequelize.define("Sexo", {
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
    modelName: "Sexo",
    tableName: "Sexo"
  });
  Sexo.associate = function (models) {
    // associations can be defined here

    Sexo.hasMany(models.Profesor, {
      foreignKey: "sexoId"
    });
    Sexo.hasMany(models.Alumno, {
      foreignKey: "sexoId"
    });
    Sexo.hasMany(models.Apoderado, {
      foreignKey: "sexoId"
    });
    Sexo.hasMany(models.AsistenteColegio, {
      foreignKey: "sexoId"
    });
  };
  return Sexo;
};