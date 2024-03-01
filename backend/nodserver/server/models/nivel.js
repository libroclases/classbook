"use strict";
module.exports = (sequelize, DataTypes) => {
  const NivelEducacional = sequelize.define(
    "NivelEducacional",
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
      modelName: "NivelEducacional",
      tableName: "NivelEducacional",
    }
  );
  NivelEducacional.associate = function (models) {
    // associations can be defined here

    NivelEducacional.hasMany(models.Apoderado, {
      foreignKey: "niveleducacionalId",
    });

  };
  return NivelEducacional;
};
