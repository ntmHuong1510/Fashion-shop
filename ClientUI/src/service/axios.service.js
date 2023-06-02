import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      Cookies?.get("uinfo") ? JSON?.parse(Cookies?.get("uinfo")).token : ""
    }`,
  },
});

const callAPI = {
  api(method, url, data) {
    return instance({
      method: method,
      url: url,
      data: method === "post" ? data : null,
      params: method === "get" ? data : null,
    });
  },
};
export default callAPI;
