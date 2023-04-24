"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shopping_Cart extends Model {
    static associate(models) {
      // define association here
    }
  }
  Shopping_Cart.init(
    {
      IDCard: DataTypes.INTEGER,
      IDUser: DataTypes.INTEGER,
      IDProduct: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
      Cost: DataTypes.DOUBLE,
      IDOrder: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shopping_Cart",
    }
  );
  return Shopping_Cart;
};
