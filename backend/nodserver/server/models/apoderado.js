"use strict";
module.exports = (sequelize, DataTypes) => {
  const Apoderado = sequelize.define(
    "Apoderado",
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
          msg: "Please enter your name",
        },
      },
      apellido2: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
      rut: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
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
      modelName: "Apoderado",
      tableName: "Apoderado",
    }
  );
  Apoderado.associate = function (models) {
    // associations can be defined here
 
    Apoderado.belongsTo(models.NivelEducacional, {
      foreignKey: "niveleducacionalId",
    });

    Apoderado.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
    });

    Apoderado.belongsTo(models.Region, {
      foreignKey: "regionId",
    });

    Apoderado.belongsTo(models.Provincix, {
      foreignKey: "provincixId",
    });

    Apoderado.belongsTo(models.Comuna, {
      foreignKey: "comunaId",
    });

    Apoderado.belongsTo(models.Sexo, {
      foreignKey: "sexoId",
    });

    Apoderado.hasMany(models.Matricula, {
      foreignKey: "apoderadoId",
    });
  };
  return Apoderado;
};
