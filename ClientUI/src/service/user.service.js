import callAPI from "./axios.service";

const userService = {
  createUser(data) {
    return callAPI.api("post", "user/createUser", data);
  },
  getUser() {
    return callAPI.api("get", "user/getUserList");
  },
  deleteUser(data) {
    return callAPI.api("delete", "user/deleteUser", data);
  },
};

export default userService;
