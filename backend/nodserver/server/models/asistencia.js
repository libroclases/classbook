"use strict";
module.exports = (sequelize, DataTypes) => {
  const Asistencia = sequelize.define(
    "Asistencia",
    {
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: false,
          msg: "Please enter a date",
        },
      },
      presente: {
        type: DataTypes.BOOLEAN,
        allowNull: {
          args: false,
          msg: 'Please enter "presente" (boolean)',
        },
      },
      dia: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Asistencia",
      tableName: "Asistencia",
    }
  );

  Asistencia.associate = function (models) {
    Asistencia.belongsTo(models.Matricula, {
      foreignKey: "matriculaId",
    });

    Asistencia.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    Asistencia.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

    Asistencia.belongsTo(models.Alumno, {
      foreignKey: "alumnoId",
    });

    Asistencia.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    Asistencia.belongsTo(models.Mes, {
      foreignKey: "mesId",
    });

  };
  return Asistencia;
};
