"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InscripcionColegio", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fechaTermino: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      esPie: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
      colegioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Colegio",
          key: "id",
          as: "Colegio",
        },
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

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("InscripcionColegio");
  },
};
