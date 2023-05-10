const db = require("./db.service");

async function createUser(username, password, email = null, sex = null) {
  const data = await db.query(
    `INSERT INTO user(user_name, password, email, sex, role) VALUES (?,?,?,?,?)`,
    [username, password, email, sex, 0],
  );
  return data;
}

async function isExistUserName(username) {
  const data = await db.query(
    `SELECT user_id, user_name, role FROM user WHERE user_name= ?;`,
    [username],
  );

  return data?.length > 0;
}

async function updateUserInfo(username, password, email = null, sex = null) {
  const userInfo = await db.query(
    `SELECT user_id, user_name, password, role, email, sex FROM user WHERE user_name= ?`,
    [username],
  );
  if (userInfo?.length > 0) {
    const info = userInfo[0];
    info.password = password ? password : info?.password;
    info.email = email ? email : info?.email;
    info.sex = sex ? sex : info?.sex;

    const data = await db.query(
      `UPDATE user SET user_id= ?, user_name= ?, password= ?, email= ?, sex= ?, role= ? WHERE user_name= ?`,
      [
        info?.user_id,
        info?.user_name,
        info?.password,
        info?.email,
        info?.sex,
        info?.role,
        info?.user_name,
      ],
    );

    if (data) {
      return info;
    } else return null;
  }

  return null;
}

module.exports = {
  createUser,
  isExistUserName,
  updateUserInfo,
};
