import http from '../apis';

export const Survey = {
  send: async (data) => {
    await http.post('users/complete-survey', {
      token: data.token,
      isOptin: data.isOptin,
      hobby: data.hobby,
      prefer: data.prefer,
    });
  },
};
