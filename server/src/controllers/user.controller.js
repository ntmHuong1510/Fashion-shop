const user = require("../services/user.service");
const commonUtils = require("../utils/common.util");

async function createUser(req, res, next) {
  const { username, password, email, sex } = req?.body;
  try {
    if (!username || !password) {
      res
        .status(200)
        .json(
          commonUtils.formatResponse(
            "Missing param username or password!",
            404,
            null,
          ),
        );
    } else {
      const isExistUser = await user.isExistUserName(username);
      if (isExistUser) {
        res
          .status(200)
          .json(
            commonUtils.formatResponse("Tên đăng nhập đã tồn tại!", 401, null),
          );
      } else {
        user
          .createUser(username, password, email, sex)
          .then((data) => {
            res
              .status(201)
              .json(
                commonUtils.formatResponse(
                  "Tạo tài khoản thành công",
                  201,
                  data[0],
                ),
              );
          })
          .catch(() => {
            res
              .status(200)
              .json(
                commonUtils.formatResponse("Đăng nhập thất bại!", 404, null),
              );
          });
      }
    }
  } catch (err) {
    console.error(`Error while auth`, err.message);
    next(err);
  }
}

async function updateUserInfo(req, res, next) {
  const { username, password, email, sex } = req?.body;
  try {
    if (!username || !password) {
      res
        .status(404)
        .json(
          commonUtils.formatResponse(
            "Missing param username or password!",
            404,
            null,
          ),
        );
    } else {
      const isExistUser = await user.isExistUserName(username);
      if (isExistUser) {
        user
          .updateUserInfo(username, password, email, sex)
          .then((data) => {
            res
              .status(201)
              .json(
                commonUtils.formatResponse(
                  "Update user info success!",
                  201,
                  data,
                ),
              );
          })
          .catch(() => {
            res
              .status(404)
              .json(
                commonUtils.formatResponse(
                  "Update user info failed!",
                  404,
                  null,
                ),
              );
          });
      } else {
        res
          .status(401)
          .json(commonUtils.formatResponse("User name not found!", 401, null));
      }
    }
  } catch (err) {
    console.error(`Error while auth`, err.message);
    next(err);
  }
}

module.exports = {
  createUser,
  updateUserInfo,
};
