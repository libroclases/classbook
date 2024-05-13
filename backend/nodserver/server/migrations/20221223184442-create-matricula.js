'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matricula', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
      },
      procedencia: {
        type: Sequelize.STRING
      },
      incorporacion: {
        type: Sequelize.DATEONLY
      },
      retiro: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      apoderadoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Apoderado',
          key: 'id',
          as: 'Apoderado',
        }
      },
      alumnoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumno',
          key: 'id',
          as: 'Alumno',
        }
      },
      colegioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Colegio',
          key: 'id',
          as: 'Colegio',
        }
      },
      cursoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Curso',
          key: 'id',
          as: 'Curso',
        }
      },
      annoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Anno',
          key: 'id',
          as: 'Anno',
        }
      },
      vinculoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Vinculo',
          key: 'id',
          as: 'Vinculo',
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
    await queryInterface.dropTable('Matricula');
  }
};