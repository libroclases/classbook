"use strict";
module.exports = (sequelize, DataTypes) => {
  const AlumnoColegio = sequelize.define(
    "AlumnoColegio",
    {
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "AlumnoColegio",
      tableName: "AlumnoColegio",
    }
  );
  AlumnoColegio.associate = function (models) {
    // associations can be defined here

    AlumnoColegio.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });
    
    AlumnoColegio.belongsTo(models.Alumno, {
      foreignKey: "alumnoId",
    });

    AlumnoColegio.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });
 
  };
  return AlumnoColegio;
};
