import callAPI from './axios.service';

const cartService = {
  addToCart(data) {
    return callAPI.api('post', '/cart/add', data);
  },
  cartInfo() {
    return callAPI.api('get', '/cart');
  },
  updateQuantity(data) {
    return callAPI.api('post', '/cart/update', data);
  },
  deleteItem(data) {
    return callAPI.api('post', '/cart/delete', data);
  },
  createOrderCart(data){
    return callAPI.api('post', '/order/create', data);
  }

};

export default cartService;
