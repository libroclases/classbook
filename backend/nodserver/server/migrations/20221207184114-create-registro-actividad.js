"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RegistroActividad", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      fecha: {
        type: Sequelize.DATEONLY,
      },
      dia: {
        type: Sequelize.INTEGER,
      },
      horaInicial: {
        type: Sequelize.INTEGER,
      },
      numeroHoras: {
        type: Sequelize.INTEGER,
      },
      colegioId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Colegio",
          key: "id",
          as: "Colegio",
        },
      },
      cursoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Curso",
          key: "id",
          as: "Curso",
        },
      },
      asignaturaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Asignatura",
          key: "id",
          as: "Asignatura",
        },
      },
      asignaturaprofesorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "AsignaturaProfesor",
          key: "id",
          as: "AsignaturaProfesor",
        },
      },
      profesorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Profesor",
          key: "id",
          as: "Profesor",
        },
      },
      horarioId: {  // debe corresponder a horaInicial
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Horario",
          key: "id",
          as: "Horario",
        },
      },
      annoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Anno",
          key: "id",
          as: "Anno",
        },
      },
      mesId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Mes",
          key: "id",
          as: "Mes",
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
    await queryInterface.dropTable("RegistroActividad");
  },
};
