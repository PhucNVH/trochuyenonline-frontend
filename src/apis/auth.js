import axios from 'axios';
const { REACT_APP_SERVER_URI } = process.env;

export const Auth = {
  login: async (data) => {
    try {
      const res = await axios.post(`${REACT_APP_SERVER_URI}/users/login`, {
        username: data.username,
        password: data.password,
      });
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
  logout: async () => {
    try {
      const res = await axios.post(
        `${REACT_APP_SERVER_URI}/logout`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
  signup: async (data) => {
    try {
      const res = await axios.post(`${REACT_APP_SERVER_URI}/users`, {
        username: data.username,
        fullName: data.fullName ? data.fullName : 'name',
        password: data.password,
      });
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
  getUser: async (token) => {
    try {
      const res = await axios.post(
        `${REACT_APP_SERVER_URI}/users/check-token`,
        {
          token: token,
        }
      );
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
};
