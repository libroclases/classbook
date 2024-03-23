"use strict";

module.exports = function (sequelize, DataTypes) {
  var EstadoAlumno = sequelize.define("EstadoAlumno", {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "EstadoAlumno",
    tableName: "EstadoAlumno"
  });
  EstadoAlumno.associate = function (models) {
    EstadoAlumno.belongsTo(models.Matricula, {
      foreignKey: "matriculaId"
    });
    EstadoAlumno.belongsTo(models.TipoEstado, {
      foreignKey: "tipoestadoId"
    });
    EstadoAlumno.belongsTo(models.Alumno, {
      foreignKey: "alumnoId"
    });
  };
  return EstadoAlumno;
};