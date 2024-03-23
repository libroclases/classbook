"use strict";
"use strict";

module.exports = function (sequelize, DataTypes) {
  var TipoColegio = sequelize.define("TipoColegio", {
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
    modelName: "TipoColegio",
    tableName: "TipoColegio"
  });
  TipoColegio.associate = function (models) {
    // associations can be defined here

    TipoColegio.hasMany(models.Asignatura, {
      foreignKey: "tipocolegioId"
    });
    TipoColegio.hasMany(models.Colegio, {
      foreignKey: "tipocolegioId"
    });
  };
  return TipoColegio;
};