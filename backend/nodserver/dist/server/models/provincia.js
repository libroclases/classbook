"use strict";

module.exports = function (sequelize, DataTypes) {
  var Provincix = sequelize.define("Provincix", {
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
    modelName: "Provincix",
    tableName: "Provincix"
  });
  Provincix.associate = function (models) {
    Provincix.belongsTo(models.Region, {
      foreignKey: "regionId"
    });
    Provincix.hasMany(models.Comuna, {
      foreignKey: "provincixId"
    });
    Provincix.hasMany(models.Colegio, {
      foreignKey: "provincixId"
    });
    Provincix.hasMany(models.AsistenteColegio, {
      foreignKey: "provincixId"
    });
    Provincix.hasMany(models.Profesor, {
      foreignKey: "provincixId"
    });
    Provincix.hasMany(models.Alumno, {
      foreignKey: "provincixId"
    });
    Provincix.hasMany(models.Apoderado, {
      foreignKey: "provincixId"
    });
  };
  return Provincix;
};