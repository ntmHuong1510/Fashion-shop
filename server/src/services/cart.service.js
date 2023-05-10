const db = require("./db.service");

async function getCartInfo(userID) {
  const data = await db.query(
    `SELECT * FROM user_cart, product WHERE user_id = ${userID} AND user_cart.product_id = product.product_id;`,
  );

  return data;
}

async function addToCart(userID, productID, quantity = 1) {
  const data = await db.query(
    `INSERT INTO user_cart(product_id, amount, user_id) VALUES ('${productID}','${quantity}','${userID}')`,
  );

  return data;
}

async function updateQuantity(userID, productID, quantity = 1) {
  const data = await db.query(
    `UPDATE user_cart SET amount=${quantity} WHERE user_id = ${userID} AND product_id = ${productID}`,
  );

  return data;
}

async function deleteItemCart(userID, productID) {
  const data = await db.query(
    `DELETE FROM user_cart WHERE user_id = ${userID} AND product_id = ${productID}`,
  );

  return data;
}

async function deleteAllItem(userID) {
  const data = await db.query(
    `DELETE FROM user_cart WHERE user_id = ${userID}`,
  );

  return data;
}

module.exports = {
  getCartInfo,
  addToCart,
  updateQuantity,
  deleteItemCart,
  deleteAllItem,
};
