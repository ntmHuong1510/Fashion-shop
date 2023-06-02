import callAPI from "./axios.service";

const paymentService = {
  createPayment(data) {
    return callAPI.api("post", "payment/create-momo-payment", data);
  },

  updatePayment(data) {
    return callAPI.api("post", "payment/ipn-momo", data);
  },
};

export default paymentService;
