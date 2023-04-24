"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      Name: DataTypes.STRING,
      Price: DataTypes.DOUBLE,
      Description: DataTypes.TEXT,
      Color: DataTypes.STRING,
      ImageUrl: DataTypes.STRING,
      Size: DataTypes.INTEGER,
      SoldQuantity: DataTypes.INTEGER,
      Rating: DataTypes.DOUBLE,
      CommentNr: DataTypes.INTEGER,
      IDCategory: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
