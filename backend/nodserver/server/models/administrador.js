"use strict";
module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define(
    "Administrador",
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
      modelName: "Administrador",
      tableName: "Administrador",
    }
  );
  Administrador.associate = function (models) {
    // associations can be defined here



    Administrador.belongsTo(models.Sexo, {
      foreignKey: "sexoId",
    });

    Administrador.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
    });

    Administrador.belongsTo(models.Region, {
      foreignKey: "regionId",
    });

    Administrador.belongsTo(models.Provincix, {
      foreignKey: "provincixId",
    });

    Administrador.belongsTo(models.Comuna, {
      foreignKey: "comunaId",
    });

  };
  return Administrador;
};
