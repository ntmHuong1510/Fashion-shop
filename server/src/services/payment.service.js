const db = require("./db.service");

async function updateOrder(data) {
  const query = await db.query(
    `UPDATE orders SET momo_order_id ='${data?.orderId}' WHERE momo_order_id = '${data?.momo_order_id}'`
  );

  return query;
}

async function updateStatusOrder(data) {
  const query = await db.query(
    `UPDATE orders SET transId ='${data?.transId}', orderType ='${data?.orderType}', resultCode ='${data?.resultCode}' WHERE momo_order_id = '${data?.orderId}'`
  );
  return query;
}

module.exports = {
  updateOrder,
  updateStatusOrder,
};
