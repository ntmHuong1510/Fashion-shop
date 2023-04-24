"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      IDProduct: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
      },
      Price: {
        type: Sequelize.DOUBLE,
      },
      Description: {
        type: Sequelize.TEXT,
      },
      Color: {
        type: Sequelize.STRING,
      },
      ImageUrl: {
        type: Sequelize.STRING,
      },
      Size: {
        type: Sequelize.INTEGER,
      },
      SoldQuantity: {
        type: Sequelize.INTEGER,
      },
      Rating: {
        type: Sequelize.DOUBLE,
      },
      CommentNr: {
        type: Sequelize.INTEGER,
      },
      IDCategory: {
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
    await queryInterface.dropTable("Products");
  },
};
