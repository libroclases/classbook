"use strict";
module.exports = (sequelize, DataTypes) => {
  const Nota = sequelize.define(
    "Nota",
    {
      nota: {
        type: DataTypes.FLOAT,
        allowNull: {
          args: true,
          msg: "Por favor ingrese la nota",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Nota",
      tableName: "Nota",
    }
  );
  Nota.associate = function (models) {
    // associations can be defined here

    Nota.belongsTo(models.Matricula, {
      foreignKey: "matriculaId",
    });

    Nota.belongsTo(models.Evaluacion, {
      foreignKey: "evaluacionId",
    });

    Nota.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });
    
    Nota.belongsTo(models.Periodo, {
      foreignKey: "periodoId",
    });
    
    Nota.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    Nota.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

    Nota.belongsTo(models.CursoProfesor, {
      foreignKey: "cursoprofesorId",
    });

    /*
    Nota.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId",
    });
    */
  };
  return Nota;
};
