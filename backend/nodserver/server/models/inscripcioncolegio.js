"use strict";
module.exports = (sequelize, DataTypes) => {
  const InscripcionColegio = sequelize.define(
    "InscripcionColegio",
    {
      /*
      fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: false,
          msg: "Por favor ingrese fecha de inicio",
        },
      },
      fechaTermino: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: true,
          msg: "Por favor ingrese fecha de término",
        },
      },
      */
      esPie: {
        type: DataTypes.BOOLEAN,
        allowNull: {
          args: true,
          msg: "Por favor ingrese si docente es PIE",
        },
      },
      esUtp: {
        type: DataTypes.BOOLEAN,
        allowNull: {
          args: true,
          msg: "Por favor ingrese si docente es UTP",
        },
      },

    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "InscripcionColegio",
      tableName: "InscripcionColegio",
    }
  );
  InscripcionColegio.associate = function (models) {
    // associations can be defined here

    InscripcionColegio.belongsTo(models.Profesor, {
      foreignKey: "profesorId",
    });

    InscripcionColegio.belongsTo(models.Colegio, {
      foreignKey: "colegioId",
    });

    InscripcionColegio.belongsTo(models.Anno, {
      foreignKey: "annoId",
    });

  };
  return InscripcionColegio;
};
