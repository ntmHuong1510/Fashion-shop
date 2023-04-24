"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      IDOrder: DataTypes.INTEGER,
      PaymentStatus: DataTypes.INTEGER,
      OrderStatus: DataTypes.INTEGER,
      TotalCost: DataTypes.DOUBLE,
      IDDelivery: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
