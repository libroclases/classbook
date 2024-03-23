"use strict";

module.exports = function (sequelize, DataTypes) {
  var RegistroActividad = sequelize.define("RegistroActividad", {
    descripcion: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la descripcion de la actividad"
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la fecha"
      }
    },
    dia: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el dia del mes"
      }
    },
    horaInicial: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el número de la hora pedagógica inicial"
      }
    },
    numeroHoras: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el número de horas pedagógicas"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "RegistroActividad",
    tableName: "RegistroActividad"
  });
  RegistroActividad.associate = function (models) {
    RegistroActividad.belongsTo(models.Colegio, {
      foreignKey: "colegioId"
    });
    RegistroActividad.belongsTo(models.Curso, {
      foreignKey: "cursoId"
    });
    RegistroActividad.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId"
    });
    RegistroActividad.belongsTo(models.AsignaturaProfesor, {
      foreignKey: "asignaturaprofesorId"
    });
    RegistroActividad.belongsTo(models.Profesor, {
      foreignKey: "profesorId"
    });
    RegistroActividad.belongsTo(models.Horario, {
      foreignKey: "horarioId"
    });
    RegistroActividad.belongsTo(models.Anno, {
      foreignKey: "annoId"
    });
    RegistroActividad.belongsTo(models.Mes, {
      foreignKey: "mesId"
    });
  };
  return RegistroActividad;
};