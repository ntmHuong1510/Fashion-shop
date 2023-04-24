"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      IDComment: DataTypes.INTEGER,
      IDProduct: DataTypes.INTEGER,
      Rate: DataTypes.DOUBLE,
      Content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
