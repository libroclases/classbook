'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nota: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
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
      evaluacionId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Evaluacion',
          key: 'id',
          as: 'Evaluacion',
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
      periodoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Periodo',
          key: 'id',
          as: 'Periodo',
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
      cursoprofesorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'CursoProfesor',
          key: 'id',
          as: 'CursoProfesor',
        }
      },
      /*
      asignaturaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Asignatura',
          key: 'id',
          as: 'Asignatura',
        }
      },
      */
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
    await queryInterface.dropTable('Nota');
  }
};