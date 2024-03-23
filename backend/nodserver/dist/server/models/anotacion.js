"use strict";

module.exports = function (sequelize, DataTypes) {
  var Anotacion = sequelize.define("Anotacion", {
    texto: {
      type: DataTypes.STRING(500),
      allowNull: {
        args: false,
        msg: "Por favor ingrese el contenido de la anotación"
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la fecha."
      }
    },
    hora: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Por favor ingrese la hora pedagógica"
      }
    }
  }, {
    sequelize: sequelize,
    freezeTableName: true,
    modelName: "Anotacion",
    tableName: "Anotacion"
  });
  Anotacion.associate = function (models) {
    // associations can be defined here

    Anotacion.belongsTo(models.Matricula, {
      foreignKey: "matriculaId"
    });
    Anotacion.belongsTo(models.Profesor, {
      foreignKey: "profesorId"
    });
    Anotacion.belongsTo(models.Anno, {
      foreignKey: "annoId"
    });
    Anotacion.belongsTo(models.Colegio, {
      foreignKey: "colegioId"
    });
    Anotacion.belongsTo(models.Curso, {
      foreignKey: "cursoId"
    });
  };
  return Anotacion;
};