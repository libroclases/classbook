'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EstadoAlumno', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      tipoestadoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'TipoEstado',
          key: 'id',
          as: 'TipoEstado',
        }
      },
      matriculaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Matricula',
          key: 'id',
          as: 'Matricula',
        }
      },
      alumnoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumno',
          key: 'id',
          as: 'Alumno',
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EstadoAlumno');
  }
};