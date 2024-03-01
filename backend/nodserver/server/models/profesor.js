"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profesor = sequelize.define(
    "Profesor",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
      apellido1: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
        },
      },
      apellido2: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
        },
      },
      rut: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
        },
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
        },
      },
      celular: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
        },
      },

      nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: {
          args: false,
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Profesor",
      tableName: "Profesor",
    }
  );
  Profesor.associate = function (models) {
    // associations can be defined here

    Profesor.hasMany(models.Horario, {
      foreignKey: "profesorId",
    });

    Profesor.hasMany(models.Evaluacion, {
      foreignKey: "profesorId",
    });

    Profesor.hasMany(models.Nota, {
      foreignKey: "profesorId",
    });

    Profesor.hasMany(models.ControlAsignatura, {
      foreignKey: "profesorId",
    });

    Profesor.hasMany(models.ControlAsignatura, {
      foreignKey: {
        name: "profesorPieId",
        allowNull: true,
      },
    });

    Profesor.hasMany(models.RegistroActividad, {
      foreignKey: "profesorId",
    });

    Profesor.hasMany(models.Anotacion, {
      foreignKey: "profesorId",
    });

    Profesor.hasMany(models.AsignaturaProfesor, {
      foreignKey: "profesorId",
    });

    Profesor.hasMany(models.InscripcionColegio, {
      foreignKey: "profesorId",
    });

    Profesor.belongsTo(models.Sexo, {
      foreignKey: "sexoId",
    });

    Profesor.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
    });

    Profesor.belongsTo(models.Region, {
      foreignKey: "regionId",
    });

    Profesor.belongsTo(models.Provincix, {
      foreignKey: "provincixId",
    });

    Profesor.belongsTo(models.Comuna, {
      foreignKey: "comunaId",
    });

  };
  return Profesor;
};
