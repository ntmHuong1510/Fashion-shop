import callAPI from "./axios.service";

const productService = {
  getProductList(data) {
    return callAPI.api("get", "product", data);
  },
  getProductByID(data) {
    return callAPI.api("get", "/product/product", data);
  },
  searchProduct(data) {
    return callAPI.api("get", "/product/search", data);
  },
};

export default productService;
