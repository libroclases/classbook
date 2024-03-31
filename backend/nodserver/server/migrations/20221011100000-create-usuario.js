'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        
      },
      operativo: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        unique: true,
        defaultValue: false
      },
      tipousuarioId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'TipoUsuario',
          key: 'id',
          as: 'TipoUsuario',
        }
      },
      temaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tema',
          key: 'id',
          as: 'Tema',
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
    await queryInterface.dropTable('Usuario');
  }
};