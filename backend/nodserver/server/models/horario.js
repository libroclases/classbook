"use strict";
module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define(
    "Horario",
    {
      hora: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Por favor ingrese el numero de hora",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Horario",
      tableName: "Horario",
    }
  );
  Horario.associate = function (models) {
    Horario.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    Horario.belongsTo(models.Curso, {
      foreignKey: "cursoId",
    });

    Horario.belongsTo(models.Asignatura, {
      foreignKey: "asignaturaId",
    });

    Horario.belongsTo(models.Profesor, {
      foreignKey: "profesorId",
    });

    Horario.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

    Horario.belongsTo(models.Dix, {
      foreignKey: "dixId",
    });

    Horario.hasMany(models.ControlAsignatura, {
      foreignKey: "horarioId",
    });

    Horario.hasMany(models.RegistroActividad, {
      foreignKey: "horarioId",
    });
  };
  return Horario;
};
