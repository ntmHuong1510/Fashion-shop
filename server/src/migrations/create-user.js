"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      IDUser: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      FirstName: {
        type: Sequelize.STRING,
      },
      LastName: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
      },
      Password: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      PhoneNr: {
        type: Sequelize.STRING,
      },
      Gender: {
        type: Sequelize.BOOLEAN,
      },
      Image: {
        type: Sequelize.STRING,
      },
      IsAdmin: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Users");
  },
};
