"use strict";

module.exports = function (sequelize, DataTypes) {
  var HoraAsignada = sequelize.define("HoraAsignada", {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Please enter your number"
      }
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your number"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "HoraAsignada",
    tableName: "HoraAsignada"
  });
  HoraAsignada.associate = function (models) {
    // associations can be defined here

    HoraAsignada.belongsTo(models.Colegio, {
      foreignKey: "colegioId"
    });
  };
  return HoraAsignada;
};