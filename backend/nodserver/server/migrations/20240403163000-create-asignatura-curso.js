'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AsignaturaCurso', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      asignaturaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Asignatura',
          key: 'id',
          as: 'Asignatura',
        }
      },
      cursoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Curso',
          key: 'id',
          as: 'Curso',
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
    await queryInterface.dropTable('AsignaturaCurso');
  }
};