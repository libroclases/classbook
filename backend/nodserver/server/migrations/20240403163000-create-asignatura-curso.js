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
      annoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Anno',
          key: 'id',
          as: 'Anno',
        }
      }, 
      colegioId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Colegio',
          key: 'id',
          as: 'Colegio',
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
      asignaturaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Asignatura',
          key: 'id',
          as: 'Asignatura',
        }
      },
      profesorId: {
        allowNull: true,
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
    await queryInterface.dropTable('AsignaturaCurso');
  }
};