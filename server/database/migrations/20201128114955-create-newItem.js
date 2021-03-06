'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      itemClass: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      onBag: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  }
};