const db = require("./db.service");

async function auth(username, password) {
  const data = await db.query(
    `SELECT user_id, user_name, role FROM user WHERE user_name= ? AND password= ? ;`,
    [username, password],
  );

  return data;
}

async function verifyForgot(username, email) {
  const data = await db.query(
    `SELECT user_id, user_name, role FROM user WHERE user_name= ? AND email= ? ;`,
    [username, email],
  );

  return data;
}

async function changePassword(username, email, password) {
  const data = await db.query(
    `UPDATE user SET password= ? WHERE user_name = ? AND email = ?`,
    [password, username, email],
  );

  if (data["affectedRows"] > 0) return data;
  else return null;
}

module.exports = {
  auth,
  verifyForgot,
  changePassword,
};
