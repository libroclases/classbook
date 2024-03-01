"use strict";
module.exports = (sequelize, DataTypes) => {
  const Dix = sequelize.define(
    "Dix",
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
      modelName: "Dix",
      tableName: "Dix",
    }
  );
  Dix.associate = function (models) {
    // associations can be defined here

    Dix.hasMany(models.Horario, {
      foreignKey: "dixId",
    });
 
  };
  return Dix;
};
