'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CursoProfesor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      annoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Anno",
          key: "id",
          as: "Anno",
        },
      },
      colegioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Colegio",
          key: "id",
          as: "Colegio",
        },
      },
      cursoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Curso",
          key: "id",
          as: "Curso",
        },
      },
      asignaturaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Profesor",
          key: "id",
          as: "Profesor",
        },
      },
      profesorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Profesor",
          key: "id",
          as: "Profesor",
        },
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
    await queryInterface.dropTable('CursoProfesor');
  }
};