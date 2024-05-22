"use strict";
module.exports = (sequelize, DataTypes) => {
  const ResumenNota = sequelize.define(
    "ResumenNota",
    {
      promedio: {
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
      modelName: "ResumenNota",
      tableName: "ResumenNota",
    }
  );
  ResumenNota.associate = function (models) {
    // associations can be defined here

    ResumenNota.belongsTo(models.Matricula, {
      foreignKey: "matriculaId",
    });

    ResumenNota.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

   
    ResumenNota.belongsTo(models.Periodo, {
      foreignKey: "periodoId",
    });

    ResumenNota.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    ResumenNota.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });


    ResumenNota.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId",
    });
    

  };
  return ResumenNota;
};
