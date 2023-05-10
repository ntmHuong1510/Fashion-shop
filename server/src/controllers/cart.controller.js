const cart = require("../services/cart.service");
const commonUtils = require("../utils/common.util");
const jwt = require("jsonwebtoken");
const { extractToken } = require("../utils/common.util");

async function getCartInfo(req, res, next) {
  const token = extractToken(req);
  const userData = jwt.decode(token);
  try {
    const listItem = await cart.getCartInfo(userData?.id);
    const result = {};
    if (listItem.length > 0) {
      let total = 0;
      listItem.forEach((ele) => {
        total = total + Number(ele.amount) * Number(ele.price);
      });
      result.user_id = listItem[0]?.user_id;
      result.totalPrice = total;
      result.orders = listItem.map((ele) => {
        const listImage = JSON.parse(ele?.image_url.replace(/'/g, '"'));
        return {
          product_id: ele?.product_id,
          quantity: ele?.amount,
          price: ele?.price,
          name: ele?.name,
          thumnail: listImage[0] ? listImage[0] : null,
        };
      });
    }
    res.status(200).json(
      commonUtils.formatResponse("Get success!", 200, {
        ...result,
      }),
    );
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function addToCart(req, res, next) {
  const token = extractToken(req);
  const userData = jwt.decode(token);
  const { product_id, quantity } = req?.body;
  try {
    const listItem = await cart.getCartInfo(userData?.id);
    const itemExist = listItem.find((ele) => ele?.product_id == product_id);
    if (itemExist) {
      await cart.updateQuantity(
        userData?.id,
        product_id,
        quantity + itemExist.amount,
      );
      res.status(200).json(commonUtils.formatResponse("Add success!", 200));
    } else {
      if (!product_id) {
        res.status(200).json(commonUtils.formatResponse("Missing params", 400));
      } else {
        await cart.addToCart(userData?.id, product_id, quantity);
        res.status(200).json(commonUtils.formatResponse("Add success!", 200));
      }
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function updateQuantity(req, res, next) {
  const token = extractToken(req);
  const userData = jwt.decode(token);
  const { product_id, quantity } = req?.body;
  try {
    if (!product_id || !quantity) {
      res.status(200).json(commonUtils.formatResponse("Missing params", 400));
    } else {
      await cart.updateQuantity(userData?.id, product_id, quantity);
      res.status(200).json(commonUtils.formatResponse("Update success!", 200));
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function deleteItemCart(req, res, next) {
  const token = extractToken(req);
  const userData = jwt.decode(token);
  const { product_id } = req?.body;
  try {
    if (!product_id) {
      res.status(200).json(commonUtils.formatResponse("Missing params", 400));
    } else {
      await cart.deleteItemCart(userData?.id, product_id);
      res.status(200).json(commonUtils.formatResponse("Delete success!", 200));
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

module.exports = {
  getCartInfo,
  addToCart,
  updateQuantity,
  deleteItemCart,
};
