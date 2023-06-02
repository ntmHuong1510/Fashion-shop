import callAPI from "./axios.service";

const historyService = {
  getOrders() {
    return callAPI.api("get", "/order/allOrder");
  },
};

export default historyService;
