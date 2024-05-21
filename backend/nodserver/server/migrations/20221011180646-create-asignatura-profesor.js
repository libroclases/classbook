'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AsignaturaProfesor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      asignaturaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Asignatura',
          key: 'id',
          as: 'Asignatura',
        }
      },
      profesorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Profesor',
          key: 'id',
          as: 'Profesor',
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
    await queryInterface.dropTable('AsignaturaProfesor');
  }
};