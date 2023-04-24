"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Delivery_Detail extends Model {
    static associate(models) {
      // define association here
    }
  }
  Delivery_Detail.init(
    {
      IDDelivery: DataTypes.INTEGER,
      ReceiverName: DataTypes.STRING,
      DetailAddress: DataTypes.STRING,
      ReceiverPhoneNr: DataTypes.STRING,
      IDUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Delivery_Detail",
    }
  );
  return Delivery_Detail;
};
