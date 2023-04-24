"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      IDCard: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      IDUser: {
        type: Sequelize.INTEGER,
      },
      IDProduct: {
        type: Sequelize.INTEGER,
      },
      Quantity: {
        type: Sequelize.INTEGER,
      },
      Cost: {
        type: Sequelize.DOUBLE,
      },
      IDOrder: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Orders");
  },
};
