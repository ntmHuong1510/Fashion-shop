import callAPI from './axios.service';

const authService = {
  login(data) {
    return callAPI.api('post', 'auth', data);
  },

  verifyForgot(data) {
    return callAPI.api('post', 'auth/verify-forgot', data);
  },

  changePassword(data) {
    return callAPI.api('post', 'auth/change-password', data);
  },
};

export default authService;
