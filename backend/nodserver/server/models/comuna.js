"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comuna = sequelize.define(
    "Comuna",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el nombre de la comuna",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Comuna",
      tableName: "Comuna",
    }
  );
  Comuna.associate = function (models) {
    Comuna.belongsTo(models.Region, {
      foreignKey: "regionId",
    });
 
    Comuna.hasMany(models.Colegio, {
      foreignKey: "comunaId",
    });

    Comuna.belongsTo(models.Provincix, {
      foreignKey: "provincixId",
    });

    Comuna.hasMany(models.Alumno, {
      foreignKey: "comunaId",
    });

    Comuna.hasMany(models.Apoderado, {
      foreignKey: "comunaId",
    });

    Comuna.hasMany(models.Profesor, {
      foreignKey: "comunaId",
    });

    Comuna.hasMany(models.AsistenteColegio, {
      foreignKey: "comunaId",
    });


    Comuna.hasMany(models.Admin, {
      foreignKey: "comunaId",
    });

  };
  return Comuna;
};
