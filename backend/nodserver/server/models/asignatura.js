"use strict";
module.exports = (sequelize, DataTypes) => {
  const Asignatura = sequelize.define(
    "Asignatura",
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
      modelName: "Asignatura",
      tableName: "Asignatura",
    }
  );
  Asignatura.associate = function (models) {
    // associations can be defined here

    Asignatura.belongsTo(models.TipoColegio, {
      foreignKey: "tipocolegioId",
    });
 
    Asignatura.hasMany(models.AsignaturaProfesor, {
      foreignKey: "asignaturaId",
    });

    Asignatura.hasMany(models.Evaluacion, {
      foreignKey: "asignaturaId",
    });

    Asignatura.hasMany(models.ControlAsignatura, {
      foreignKey: "asignaturaId",
    });

    Asignatura.hasMany(models.RegistroActividad, {
      foreignKey: "asignaturaId",
    });

 
 
  };
  return Asignatura;
};
