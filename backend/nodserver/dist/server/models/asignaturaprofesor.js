"use strict";

module.exports = function (sequelize, DataTypes) {
  var AsignaturaProfesor = sequelize.define("AsignaturaProfesor", {
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
    modelName: "AsignaturaProfesor",
    tableName: "AsignaturaProfesor"
  });
  AsignaturaProfesor.associate = function (models) {
    // associations can be defined here

    AsignaturaProfesor.hasMany(models.Horario, {
      foreignKey: "asignaturaprofesorId"
    });
    AsignaturaProfesor.hasMany(models.Evaluacion, {
      foreignKey: "asignaturaprofesorId"
    });
    AsignaturaProfesor.hasMany(models.Nota, {
      foreignKey: "asignaturaprofesorId"
    });
    AsignaturaProfesor.hasMany(models.RegistroActividad, {
      foreignKey: "asignaturaprofesorId"
    });
    AsignaturaProfesor.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId"
    });
    AsignaturaProfesor.belongsTo(models.Profesor, {
      foreignKey: "profesorId"
    });
  };
  return AsignaturaProfesor;
};