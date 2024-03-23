"use strict";

module.exports = function (sequelize, DataTypes) {
  var ControlAsignatura = sequelize.define("ControlAsignatura", {
    inasistentesHombres: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero de alumnos varones inasistentes"
      }
    },
    inasistentesMujeres: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero de alumnas mujeres inasistentes"
      }
    },
    atrasos: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la asistencia total"
      }
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la asistencia total"
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
    hora: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero de hora pedagogica"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "ControlAsignatura",
    tableName: "ControlAsignatura"
  });
  ControlAsignatura.associate = function (models) {
    ControlAsignatura.belongsTo(models.Colegio, {
      foreignKey: "colegioId"
    });
    ControlAsignatura.belongsTo(models.Curso, {
      foreignKey: "cursoId"
    });
    ControlAsignatura.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId"
    });
    ControlAsignatura.belongsTo(models.Profesor, {
      foreignKey: "profesorId"
    });
    ControlAsignatura.belongsTo(models.Profesor, {
      as: "ProfesorPie",
      foreignKey: "profesorPieId",
      allowNull: true
    });
    ControlAsignatura.belongsTo(models.Horario, {
      foreignKey: "horarioId"
    });
    ControlAsignatura.belongsTo(models.Anno, {
      foreignKey: "annoId"
    });
    ControlAsignatura.belongsTo(models.Mes, {
      foreignKey: "mesId"
    });
  };
  return ControlAsignatura;
};