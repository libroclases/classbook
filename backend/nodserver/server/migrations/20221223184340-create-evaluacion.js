'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evaluacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      hora: {
        type: Sequelize.INTEGER
      },
      ponderacion: {
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
      cursoprofesorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'CursoProfesor',
          key: 'id',
          as: 'CursoProfesor',
        }
      },
      tipoevaluacionId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'TipoEvaluacion',
          key: 'id',
          as: 'TipoEvaluacion',
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
    await queryInterface.dropTable('Evaluacion');
  }
};