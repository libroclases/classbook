"use strict";

module.exports = function (sequelize, DataTypes) {
  var Acceso = sequelize.define("Acceso", {
    idEntrada: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese el id de la entrada"
      }
    },
    fechaExpiracion: {
      type: DataTypes.DATEONLY,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la fecha de expiración"
      }
    },
    timestampExpiracion: {
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la fecha de expiración"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "Acceso",
    tableName: "Acceso"
  });
  Acceso.associate = function (models) {
    // associations can be defined here

    Acceso.belongsTo(models.Usuario, {
      foreignKey: "usuarioId"
    });
    Acceso.belongsTo(models.Tabla, {
      foreignKey: "tablaId"
    });
  };
  return Acceso;
};