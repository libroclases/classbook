"use strict";
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
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
      modelName: "Admin",
      tableName: "Admin",
    }
  );
  Admin.associate = function (models) {
    // associations can be defined here



    Admin.belongsTo(models.Sexo, {
      foreignKey: "sexoId",
    });

    Admin.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
    });

    Admin.belongsTo(models.Region, {
      foreignKey: "regionId",
    });

    Admin.belongsTo(models.Provincix, {
      foreignKey: "provincixId",
    });

    Admin.belongsTo(models.Comuna, {
      foreignKey: "comunaId",
    });

  };
  return Admin;
};
