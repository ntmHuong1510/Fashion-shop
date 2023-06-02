const order = require("../services/order.service");
const cart = require("../services/cart.service");
const commonUtils = require("../utils/common.util");
const jwt = require("jsonwebtoken");
const { extractToken } = require("../utils/common.util");
const { v4: uuidv4 } = require("uuid");

async function createOrder(req, res, next) {
  const token = extractToken(req);
  const userData = jwt.decode(token);
  const { phone, address, shipper, ship_price, date, note, name } = req?.body;

  try {
    const listItem = await cart.getCartInfo(userData?.id);
    const result = {};
    if (listItem.length > 0) {
      let total = 0;
      listItem.forEach((ele) => {
        total = total + Number(ele.amount) * Number(ele.price);
      });
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
    } else {
      res
        .status(200)
        .json(commonUtils.formatResponse("No item in cart", 404, null));
    }
    if (phone && address && shipper && ship_price && date) {
      const idOrderMomo = uuidv4();
      await order.createOrder({
        user_id: userData?.id,
        order_items: result,
        phone,
        address,
        shipper,
        ship_price,
        date,
        note,
        name,
        momo_order_id: idOrderMomo,
      });
      await cart.deleteAllItem(userData?.id);
      res.status(200).json(
        commonUtils.formatResponse("Create success!", 200, {
          momo_order_id: idOrderMomo,
        })
      );
    } else {
      res
        .status(200)
        .json(
          commonUtils.formatResponse(
            "Missing param  phone or address or shipper or ship_price or date!",
            404,
            null
          )
        );
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function deleteOrder(req, res, next) {
  const { order_id } = req?.body;

  try {
    if (order_id) {
      const { status } = await order.getOrderInfo(order_id);
      if (Number(status) === 0) {
        await order.deleteOrder(order_id);
        res
          .status(200)
          .json(commonUtils.formatResponse("Delete success!", 200));
      } else {
        res
          .status(200)
          .json(
            commonUtils.formatResponse("You can't delete this order!", 400)
          );
      }
    } else {
      res
        .status(200)
        .json(commonUtils.formatResponse("Missing param  order_id", 404, null));
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function getOrders(req, res, next) {
  const token = extractToken(req);
  const userData = jwt.decode(token);

  try {
    const data = await order.getAllOrder(userData?.id);
    res.status(200).json(
      commonUtils.formatResponse(
        "Get success",
        200,
        data.map((ele) => ({
          ...ele,
          order_items: JSON.parse(ele?.order_items?.replace(/'/g, '"')),
        }))
      )
    );
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const data = await order.getAllOrderAdmin();
    res.status(200).json(
      commonUtils.formatResponse(
        "Get success",
        200,
        data.map((ele) => ({
          ...ele,
          order_items: JSON.parse(ele?.order_items?.replace(/'/g, '"')),
        }))
      )
    );
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function getOrderById(req, res, next) {
  const { order_id } = req?.query;
  try {
    if (order_id) {
      const data = await order.getOrderInfo(order_id);
      if (data?.length > 0)
        res.status(200).json(
          commonUtils.formatResponse("Get success", 200, {
            ...data[0],
            order_items: JSON.parse(data[0]?.order_items?.replace(/'/g, '"')),
          })
        );
      else res.status(200).json(commonUtils.formatResponse("Get success", 200));
    } else {
      res
        .status(200)
        .json(commonUtils.formatResponse("Missing param order_id!", 404, null));
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

async function updateStatusOrder(req, res, next) {
  const { order_id, status } = req?.body;
  try {
    if (order_id && status) {
      await order.updateStatusOrder(order_id, status);
      res.status(200).json(commonUtils.formatResponse("Update success", 200));
    } else {
      res
        .status(200)
        .json(
          commonUtils.formatResponse(
            "Missing param order_id or status",
            404,
            null
          )
        );
    }
  } catch (err) {
    console.error(`Error while get`, err.message);
    next(err);
  }
}

module.exports = {
  createOrder,
  deleteOrder,
  getOrders,
  getOrderById,
  updateStatusOrder,
  getAllOrders,
};
