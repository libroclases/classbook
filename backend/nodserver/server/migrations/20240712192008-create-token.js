

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Token', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      secret: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dataUrl: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      authIsSet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      usuarioId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuario',
          key: 'id',
          as: 'Usuario',
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
    await queryInterface.dropTable('Token');
  }
};