"use strict";

module.exports = function (sequelize, DataTypes) {
  var TipoEvaluacion = sequelize.define("TipoEvaluacion", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el nombre de la evaluacion"
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese una descripcion"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "TipoEvaluacion",
    tableName: "TipoEvaluacion"
  });
  TipoEvaluacion.associate = function (models) {
    TipoEvaluacion.hasMany(models.Evaluacion, {
      foreignKey: "tipoevaluacionId"
    });
  };
  return TipoEvaluacion;
};