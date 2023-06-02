const db = require("./db.service");

async function createOrder(data) {
  const query = await db.query(
    `INSERT INTO orders(user_id, order_items, phone, address, shipper, ship_price, date, status, note, name, momo_order_id) VALUES ('${
      data?.user_id
    }','${JSON.stringify(data?.order_items)}','${data?.phone}','${
      data?.address
    }','${data?.shipper}','${data?.ship_price}','${data?.date}','0','${
      data?.note
    }', '${data?.name}', '${data?.momo_order_id}')`
  );

  return query;
}

async function deleteOrder(order_id) {
  const query = await db.query(
    `DELETE FROM orders WHERE order_id = ${order_id}`
  );
  return query;
}

async function getOrderInfo(order_id) {
  const query = await db.query(
    `SELECT * FROM orders WHERE order_id = ${order_id}`
  );
  return query;
}

async function getAllOrder(user_id) {
  const query = await db.query(
    `SELECT * FROM orders WHERE user_id = ${user_id} ORDER BY orders.date DESC`
  );
  return query;
}

async function getAllOrderAdmin() {
  const query = await db.query(
    `SELECT * FROM orders WHERE 1 ORDER BY orders.date DESC`
  );
  return query;
}

async function updateStatusOrder(order_id, status) {
  const query = await db.query(
    `UPDATE orders SET status='${status}' WHERE order_id = ${order_id}`
  );
  return query;
}

module.exports = {
  createOrder,
  deleteOrder,
  getOrderInfo,
  getAllOrder,
  updateStatusOrder,
  getAllOrderAdmin,
};
