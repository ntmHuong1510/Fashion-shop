"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Email: DataTypes.STRING,
      Password: DataTypes.STRING,
      Address: DataTypes.STRING,
      PhoneNr: DataTypes.STRING,
      Gender: DataTypes.BOOLEAN, // 0: Felmale 1: Male
      Image: DataTypes.STRING,
      IsAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
