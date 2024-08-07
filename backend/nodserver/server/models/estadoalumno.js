"use strict";
module.exports = (sequelize, DataTypes) => {
  const EstadoAlumno = sequelize.define(
    "EstadoAlumno",
    {
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el numero del mes",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "EstadoAlumno",
      tableName: "EstadoAlumno",
    }
  );

  EstadoAlumno.associate = function (models) {

    
    EstadoAlumno.belongsTo(models.Matricula, {
      foreignKey: "matriculaId",
    });
    

    EstadoAlumno.belongsTo(models.TipoEstado, {
      foreignKey: "tipoestadoId",
    });

    EstadoAlumno.belongsTo(models.Alumno, {
      foreignKey: "alumnoId",
    });

    EstadoAlumno.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    EstadoAlumno.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    EstadoAlumno.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

  };

  return EstadoAlumno;
};
