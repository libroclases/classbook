"use strict";
module.exports = (sequelize, DataTypes) => {
  const Evaluacion = sequelize.define(
    "Evaluacion",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Por favor ingrese la nota",
        },
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: false,
          msg: "Por favor ingrese la fecha",
        },
      },
      hora: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Por favor ingrese la hora",
        },
      },
      ponderacion: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Por favor ingrese la ponderación",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Evaluacion",
      tableName: "Evaluacion",
    }
  );

  Evaluacion.associate = function (models) {
 
    Evaluacion.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    Evaluacion.belongsTo(models.Periodo, {
      foreignKey: "periodoId",
    });
 
    Evaluacion.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    Evaluacion.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

    Evaluacion.belongsTo(models.CursoProfesor, {
      foreignKey: "cursoprofesorId",
    });

 

    Evaluacion.belongsTo(models.TipoEvaluacion, {
      foreignKey: "tipoevaluacionId",
    });
    /*
    Evaluacion.hasMany(models.Nota, {
      foreignKey: "evaluacionId",
    });
    */
  };

  return Evaluacion;
};
