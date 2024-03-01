"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vinculo = sequelize.define(
    "Vinculo",
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
      modelName: "Vinculo",
      tableName: "Vinculo",
    }
  );
  Vinculo.associate = function (models) {
    // associations can be defined here

    Vinculo.hasMany(models.Matricula, {
      foreignKey: "vinculoId",
    });

  };
  return Vinculo;
};
