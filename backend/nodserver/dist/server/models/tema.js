"use strict";

module.exports = function (sequelize, DataTypes) {
  var Tema = sequelize.define("Tema", {
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
    modelName: "Tema",
    tableName: "Tema"
  });
  Tema.associate = function (models) {
    // associations can be defined here

    Tema.hasMany(models.Usuario, {
      foreignKey: "temaId"
    });
  };
  return Tema;
};