import callAPI from "./axios.service";

const commentService = {
  getProductComments(data) {
    return callAPI.api("get", "/comment/comment", data);
  },
  getUserNameForAComment(data) {
    return callAPI.api("get", "/user/getUserName", data);
  },
};

export default commentService;
