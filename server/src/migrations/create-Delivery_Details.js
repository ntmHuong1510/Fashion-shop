"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Delivery_Details", {
      IDDelivery: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ReceiverName: {
        type: Sequelize.STRING,
      },
      DetailAddress: {
        type: Sequelize.STRING,
      },
      ReceiverPhoneNr: {
        type: Sequelize.STRING,
      },
      IDUser: {
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
    await queryInterface.dropTable("Delivery_Details");
  },
};
