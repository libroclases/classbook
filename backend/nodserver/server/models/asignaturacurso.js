'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AsignaturaCurso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AsignaturaCurso.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AsignaturaCurso',
  });
  return AsignaturaCurso;
};