"use strict";
module.exports = (sequelize, DataTypes) => {
  const Anno = sequelize.define(
    "Anno",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el nombre del Año",
        },
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el numero del Año.",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Anno",
      tableName: "Anno",
    }
  );

  Anno.associate = function (models) {
    // associations can be defined here

    Anno.hasMany(models.Matricula, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.ControlAsignatura, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.RegistroActividad, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.Curso, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.CursoProfesor, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.Horario, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.Asistencia, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.InscripcionColegio, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.Evaluacion, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.Nota, {
      foreignKey: "annoId",
    });

    Anno.hasMany(models.Anotacion, {
      foreignKey: "annoId",
    });
  };
  return Anno;
};
