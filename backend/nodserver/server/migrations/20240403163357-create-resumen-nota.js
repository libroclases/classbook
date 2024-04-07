'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ResumenNota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promedio: {
        type: Sequelize.FLOAT
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
      asignaturacursoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'AsignaturaCurso',
          key: 'id',
          as: 'AsignaturaCurso',
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
      periodoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Periodo',
          key: 'id',
          as: 'Periodo',
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
      annoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Anno',
          key: 'id',
          as: 'Anno',
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
    await queryInterface.dropTable('ResumenNota');
  }
};