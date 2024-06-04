"use strict";
module.exports = (sequelize, DataTypes) => {
  const Matricula = sequelize.define(
    "Matricula",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
      procedencia: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
      incorporacion: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },

    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Matricula",
      tableName: "Matricula",
    }
  );

  Matricula.associate = function (models) {
    // associations can be defined here

    Matricula.belongsTo(models.Alumno, {
      foreignKey: "alumnoId",
    });

    Matricula.belongsTo(models.Apoderado, {
      foreignKey: "apoderadoId",
    });

    Matricula.belongsTo(models.Vinculo, {
      foreignKey: "vinculoId",
    });

    Matricula.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    Matricula.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

    Matricula.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    Matricula.hasMany(models.Asistencia, {
      foreignKey: "matriculaId",
    });

    Matricula.hasMany(models.Nota, {
      foreignKey: "matriculaId",
    });

    Matricula.hasMany(models.EstadoAlumno, {
      foreignKey: "matriculaId",
    });

    Matricula.hasMany(models.Anotacion, {
      foreignKey: "matriculaId",
    });
  };
  return Matricula;
};
