'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AlumnoColegio', {
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
      alumnoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumno',
          key: 'id',
          as: 'Alumno',
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
    await queryInterface.dropTable('AlumnoColegio');
  }
};