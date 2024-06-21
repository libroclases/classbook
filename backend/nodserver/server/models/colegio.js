"use strict";
module.exports = (sequelize, DataTypes) => {
  const Colegio = sequelize.define(
    "Colegio",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Porfavor ingrese su Nombre",
        },
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your Teléfono",
        },
      },
      rut: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your rut",
        },
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
      email: {
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
      modelName: "Colegio",
      tableName: "Colegio",
    }
  );
  Colegio.associate = function (models) {
    Colegio.belongsTo(models.Region, {
      foreignKey: "regionId",
    });

    Colegio.belongsTo(models.Provincix, {
      foreignKey: "provincixId",
    });

    Colegio.belongsTo(models.Comuna, {
      foreignKey: "comunaId",
    });

    Colegio.belongsTo(models.TipoColegio, {
      foreignKey: "tipocolegioId",
    });

    Colegio.hasMany(models.Curso, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.HoraAsignada, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.Horario, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.Matricula, {
      foreignKey: "colegioId",
    });
 
    Colegio.hasMany(models.Asistencia, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.Ventana, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.ControlAsignatura, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.InscripcionColegio, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.Anotacion, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.RegistroActividad, {
      foreignKey: "colegioId",
    });

    Colegio.hasMany(models.EstadoAlumno, {
      foreignKey: "colegioId",
    });
  };
  return Colegio;
};
