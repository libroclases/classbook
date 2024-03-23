"use strict";

module.exports = function (sequelize, DataTypes) {
  var Region = sequelize.define("Region", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your name"
      }
    },
    larga: {
      type: DataTypes.STRING,
      allowNull: {
        args: false
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "Region",
    tableName: "Region"
  });
  Region.associate = function (models) {
    // associations can be defined here

    Region.hasMany(models.Alumno, {
      foreignKey: "regionId"
    });
    Region.hasMany(models.Provincix, {
      foreignKey: "regionId"
    });
    Region.hasMany(models.Apoderado, {
      foreignKey: "regionId"
    });
    Region.hasMany(models.Profesor, {
      foreignKey: "regionId"
    });
    Region.hasMany(models.Colegio, {
      foreignKey: "regionId"
    });
    Region.hasMany(models.AsistenteColegio, {
      foreignKey: "regionId"
    });
  };
  return Region;
};