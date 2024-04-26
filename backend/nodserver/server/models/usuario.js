"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
        unique: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
        unique: true,
      },
      operativo: {
        type: DataTypes.BOOLEAN,
        allowNull: {
          args: true,
          msg: "Please enter your name",
        },
        unique: false,
      },
    },
    
    {
      sequelize,
      freezeTableName: true,
      modelName: "Usuario",
      tableName: "Usuario",
    }
  );
  Usuario.associate = function (models) {
    // associations can be defined here

    Usuario.belongsTo(models.TipoUsuario, {
      foreignKey: "tipousuarioId",
    });

    Usuario.belongsTo(models.Tema, {
      foreignKey: "temaId",
    });

    Usuario.hasMany(models.Profesor, {
      foreignKey: "usuarioId",
    });

    Usuario.hasMany(models.Alumno, {
      foreignKey: "usuarioId",
    });

    Usuario.hasMany(models.Apoderado, {
      foreignKey: "usuarioId",
    });

    Usuario.hasMany(models.AsistenteColegio, {
      foreignKey: "usuarioId",
    });

    Usuario.hasMany(models.Utp, {
      foreignKey: "usuarioId",
    });    

    Usuario.hasMany(models.Administrador, {
      foreignKey: "usuarioId",
    });    


  };
  return Usuario;
};
