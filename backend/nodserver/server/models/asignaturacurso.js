"use strict";
module.exports = (sequelize, DataTypes) => {
  const AsignaturaCurso = sequelize.define(
    "AsignaturaCurso",
    {

    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "AsignaturaCurso",
      tableName: "AsignaturaCurso",
    }
  );
  AsignaturaCurso.associate = function (models) {
    // associations can be defined here

    AsignaturaCurso.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    AsignaturaCurso.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });
    
    AsignaturaCurso.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

    AsignaturaCurso.hasMany(models.ResumenNota, {
      foreignKey: "asignaturacursoId",
    });

    AsignaturaCurso.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId",
    });

    AsignaturaCurso.belongsTo(models.Profesor, {
      foreignKey: "profesorId",
    });


  };
  return AsignaturaCurso;
};
