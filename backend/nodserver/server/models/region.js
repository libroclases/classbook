"use strict";
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define(
    "Region",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
      larga: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Region",
      tableName: "Region",
    }
  );

  Region.associate = function (models) {
    // associations can be defined here

    Region.hasMany(models.Alumno, {
      foreignKey: "regionId",
    });

    Region.hasMany(models.Provincix, {
      foreignKey: "regionId",
    });

    Region.hasMany(models.Apoderado, {
      foreignKey: "regionId",
    });

    Region.hasMany(models.Profesor, {
      foreignKey: "regionId",
    });

    Region.hasMany(models.Colegio, {
      foreignKey: "regionId",
    });

    Region.hasMany(models.AsistenteColegio, {
      foreignKey: "regionId",
    });

    Region.hasMany(models.Admin, {
      foreignKey: "regionId",
    });

  };
  return Region;
};
