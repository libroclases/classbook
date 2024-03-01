'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Horario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hora: {
        type: Sequelize.INTEGER
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
      asignaturaprofesorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'AsignaturaProfesor',
          key: 'id',
          as: 'AsignaturaProfesor',
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
      annoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Anno',
          key: 'id',
          as: 'Anno',
        }
      },
      dixId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Dix',
          key: 'id',
          as: 'Dix',
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
    await queryInterface.dropTable('Horario');
  }
};