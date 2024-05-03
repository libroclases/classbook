'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido1: {
        type: Sequelize.STRING
      },
      apellido2: {
        type: Sequelize.STRING
      },
      rut: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      nacimiento: {
        type: Sequelize.DATEONLY
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
      
      sexoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sexo',
          key: 'id',
          as: 'Sexo',
        }
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
     }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admin');
  }
};