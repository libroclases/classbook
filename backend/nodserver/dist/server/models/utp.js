"use strict";

module.exports = function (sequelize, DataTypes) {
  var Utp = sequelize.define("Utp", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your name"
      }
    },
    apellido1: {
      type: DataTypes.STRING,
      allowNull: {
        args: false
      }
    },
    apellido2: {
      type: DataTypes.STRING,
      allowNull: {
        args: false
      }
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: {
        args: false
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: {
        args: false
      }
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: {
        args: false
      }
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: {
        args: false
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "Utp",
    tableName: "Utp"
  });
  Utp.associate = function (models) {
    // associations can be defined here

    Utp.belongsTo(models.Sexo, {
      foreignKey: "sexoId"
    });
    Utp.belongsTo(models.Usuario, {
      foreignKey: "usuarioId"
    });
    Utp.belongsTo(models.Region, {
      foreignKey: "regionId"
    });
    Utp.belongsTo(models.Provincix, {
      foreignKey: "provincixId"
    });
    Utp.belongsTo(models.Comuna, {
      foreignKey: "comunaId"
    });
  };
  return Utp;
};