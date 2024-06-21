"use strict";
module.exports = (sequelize, DataTypes) => {
  const CursoProfesor = sequelize.define(
    "CursoProfesor",
    {

    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "CursoProfesor",
      tableName: "CursoProfesor",
    }
  );
  CursoProfesor.associate = function (models) {
    // associations can be defined here


    CursoProfesor.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    CursoProfesor.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    CursoProfesor.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

    CursoProfesor.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId",
    });

    CursoProfesor.belongsTo(models.Profesor, {
      foreignKey: "profesorId",
    });

    
    CursoProfesor.hasMany(models.Evaluacion, {
      foreignKey: "cursoprofesorId",
    });
    
  
    CursoProfesor.hasMany(models.Nota, {
      foreignKey: "cursoprofesorId",
    });
      

  };
  return CursoProfesor;
};