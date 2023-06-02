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
            null
          )
        );
    } else {
      const isExistUser = await user.isExistUserName(username);
      if (isExistUser) {
        res
          .status(200)
          .json(
            commonUtils.formatResponse("Tên đăng nhập đã tồn tại!", 401, null)
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
                  data[0]
                )
              );
          })
          .catch(() => {
            res
              .status(200)
              .json(
                commonUtils.formatResponse("Tạo tài khoản thất bại!", 404, null)
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
            null
          )
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
                  data
                )
              );
          })
          .catch(() => {
            res
              .status(404)
              .json(
                commonUtils.formatResponse(
                  "Update user info failed!",
                  404,
                  null
                )
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
async function searchUser(req, res, next) {
  const username = req.body.user_name;
  try {
    if (!username) {
      res
        .status(200)
        .json(
          commonUtils.formatResponse(
            "Please enter username to search",
            404,
            null
          )
        );
    } else {
      const userdata = await user.searchUserByName(username);
      if (!userdata) {
        res
          .status(200)
          .json(
            commonUtils.formatResponse(
              "User not found in the database!!!",
              204,
              null
            )
          );
      } else {
        res
          .status(200)
          .json(
            commonUtils.formatResponse(
              "Find user successfully!!!",
              200,
              userdata
            )
          );
      }
    }
  } catch (error) {
    console.error(`Error while auth`, err.message);
    next(err);
  }
}

async function getUserName(req, res, next) {
  const data = req?.query;
  try {
    const dataU = await user.searchUserNameByID(parseInt(data?.user_id, 10));
    const username = Object.values(JSON.parse(JSON.stringify(dataU)));
    res
      .status(200)
      .json(
        commonUtils.formatResponse("Find user successfully!!!", 200, username)
      );
  } catch (error) {
    console.error(`Error while auth`, err.message);
    next(err);
  }
}

async function viewAllUsers(req, res, next) {
  try {
    const userList = await user.getAllUsers();
    res
      .status(200)
      .json(
        commonUtils.formatResponse(
          "Successfully retrive all user data!!!",
          200,
          [...userList]
        )
      );
  } catch (error) {
    console.error(`Error while auth`, err.message);
    next(err);
  }
}
async function deleteUser(req, res, next) {
  console.log(req?.body);
  // try {
  //   const { user_id } = req?.body;
  //   if (!user_id) {
  //     res
  //       .status(200)
  //       .json(commonUtils.formatResponse("Missing params user id", 400));
  //   } else {
  //     await user.deleteUser(user_id);
  //     res
  //       .status(200)
  //       .json(commonUtils.formatResponse("Delete user success!", 200));
  //   }
  // } catch (error) {
  //   console.error(`Error while auth`, err.message);
  //   next(err);
  // }
}

module.exports = {
  createUser,
  updateUserInfo,
  searchUser,
  viewAllUsers,
  getUserName,
  deleteUser,
};
