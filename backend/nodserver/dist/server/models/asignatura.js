"use strict";

module.exports = function (sequelize, DataTypes) {
  var Asignatura = sequelize.define("Asignatura", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please enter your name"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "Asignatura",
    tableName: "Asignatura"
  });
  Asignatura.associate = function (models) {
    // associations can be defined here

    Asignatura.hasMany(models.AsignaturaProfesor, {
      foreignKey: "asignaturaId"
    });
    Asignatura.hasMany(models.ControlAsignatura, {
      foreignKey: "asignaturaId"
    });
    Asignatura.hasMany(models.RegistroActividad, {
      foreignKey: "asignaturaId"
    });
    Asignatura.belongsTo(models.TipoColegio, {
      foreignKey: "tipocolegioId"
    });
  };
  return Asignatura;
};