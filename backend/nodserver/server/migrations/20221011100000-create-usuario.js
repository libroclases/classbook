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
        unique: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        
      },
      operativo: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        unique: false,
        defaultValue: false
      },
      uid: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      secret: {
        type: Sequelize.STRING,
        allowNull: true,        
      },
      authIsSet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
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