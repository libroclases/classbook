"use strict";
module.exports = (sequelize, DataTypes) => {
  const Alumno = sequelize.define(
    "Alumno",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
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
      modelName: "Alumno",
      tableName: "Alumno",
    }
  );

  Alumno.getLabel = function () {
    return this.apellido1 + ", " + this.apellido2 + ", " +  this.nombre;
  };

  Alumno.associate = function (models) {
    // associations can be defined here

    Alumno.belongsTo(models.Sexo, {
      foreignKey: "sexoId",
    });
    
    Alumno.belongsTo(models.Colegio, {
        foreignKey: 'colegioId',
    });
    
    Alumno.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
    });

    Alumno.hasMany(models.Matricula, {
      foreignKey: "alumnoId",
    });

    Alumno.hasMany(models.Asistencia, {
      foreignKey: "alumnoId",
    });

    Alumno.hasMany(models.EstadoAlumno, {
      foreignKey: "alumnoId",
    });

    Alumno.belongsTo(models.Region, {
      foreignKey: "regionId",
    });

    Alumno.belongsTo(models.Provincix, {
      foreignKey: "provincixId",
    });

    Alumno.belongsTo(models.Comuna, {
      foreignKey: "comunaId",
    });

  };
  return Alumno;
};
