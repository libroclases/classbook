"use strict";
module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define(
    "Curso",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Porfavor ingrese su Nombre",
        },
      },
      profesor_jefe: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Porfavor ingrese su Nombre",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Curso",
      tableName: "Curso",
    }
  );

  Curso.associate = function (models) {
    Curso.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    Curso.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    Curso.hasMany(models.Horario, {
      foreignKey: "cursoId",
    });

    Curso.hasMany(models.Matricula, {
      foreignKey: "cursoId",
    });

    Curso.hasMany(models.Evaluacion, {
      foreignKey: "cursoId",
    });

    Curso.hasMany(models.Asistencia, {
      foreignKey: "cursoId",
    });

    Curso.hasMany(models.ControlAsignatura, {
      foreignKey: "cursoId",
    });

    Curso.hasMany(models.Anotacion, {
      foreignKey: "cursoId",
    });

    Curso.hasMany(models.RegistroActividad, {
      foreignKey: "cursoId",
    });
  };

  return Curso;
};
