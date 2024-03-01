'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Colegio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      rut: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      www: {
        type: Sequelize.STRING
      },
      regionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Region',
          key: 'id',
          as: 'Region',
        }
      },
      provincixId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Provincix',
          key: 'id',
          as: 'Provincix',
        }
      },
      comunaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Comuna',
          key: 'id',
          as: 'Comuna',
        }
      },
      tipocolegioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'TipoColegio',
          key: 'id',
          as: 'TipoColegio',
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
    await queryInterface.dropTable('Colegio');
  }
};