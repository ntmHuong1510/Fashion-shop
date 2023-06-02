const db = require("./db.service");

async function getCommentsOfProduct(product_id) {
  const query = await db.query(
    `SELECT * FROM comments WHERE product_id = ${product_id};`
  );
  return query;
}

async function createComment(product_id, user_id, rating, content) {
  const query = await db.query(
    `INSERT INTO comments(product_id, user_id, rating, content) VALUES (${product_id}, ${user_id}, '${rating}','${content}');`
  );
  return query;
}

async function getAllComments() {
  const query = await db.query(`SELECT * FROM comments;`);
  return query;
}

async function deleteComment(comment_id) {
  const data = await db.query(
    `DELETE FROM comments WHERE comment_id = ${comment_id};`
  );
  return data;
}

module.exports = {
  getCommentsOfProduct,
  createComment,
  getAllComments,
  deleteComment,
};
