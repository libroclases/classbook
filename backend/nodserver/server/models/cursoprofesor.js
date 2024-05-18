"use strict";
module.exports = (sequelize, DataTypes) => {
  const CursoProfesor = sequelize.define(
    "CursoProfesor",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
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
    /*
    CursoProfesor.hasMany(models.Nota, {
      foreignKey: "cursoprofesorId",
    });
    */
    CursoProfesor.belongsTo(models.Profesor, {
      foreignKey: "profesorId",
    });

    CursoProfesor.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    CursoProfesor.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });
    
    CursoProfesor.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

  };
  return CursoProfesor;
};