"use strict";

module.exports = function (sequelize, DataTypes) {
  var AsistenteColegio = sequelize.define("AsistenteColegio", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    },
    apellido1: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    },
    apellido2: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el numero del mes"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "AsistenteColegio",
    tableName: "AsistenteColegio"
  });
  AsistenteColegio.associate = function (models) {
    AsistenteColegio.belongsTo(models.TipoAsistente, {
      foreignKey: "tipoasistenteId"
    });
    AsistenteColegio.belongsTo(models.Usuario, {
      foreignKey: "usuarioId"
    });
    AsistenteColegio.belongsTo(models.Sexo, {
      foreignKey: "sexoId"
    });
    AsistenteColegio.belongsTo(models.Region, {
      foreignKey: "regionId"
    });
    AsistenteColegio.belongsTo(models.Provincix, {
      foreignKey: "provincixId"
    });
    AsistenteColegio.belongsTo(models.Comuna, {
      foreignKey: "comunaId"
    });
  };
  return AsistenteColegio;
};