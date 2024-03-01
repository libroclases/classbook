'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Acceso', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaExpiracion: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      timestampExpiracion: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      idEntrada: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tablaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tabla',
          key: 'id',
          as: 'Tabla',
        }
      },
      usuarioId: {
        allowNull: false,
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
    await queryInterface.dropTable('Acceso');
  }
};