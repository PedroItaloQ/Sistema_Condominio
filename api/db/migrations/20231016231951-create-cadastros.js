'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cadastros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      rg: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      empresa: {
        type: Sequelize.STRING
      },
      apt: {
        type: Sequelize.INTEGER
      },
      bloco: {
        type: Sequelize.STRING
      },
      dataEntrada: {
        type: Sequelize.DATE
      },
      veiculo: {
        type: Sequelize.STRING
      },
      placa: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Cadastros');
  }
};