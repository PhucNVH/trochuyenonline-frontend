import axios from 'axios';
import http from '../apis';
import { NOTIFICATION_API } from '../dto/enums/router.enum';
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
  registerToken: async (token) => {
    const result = await axios.post(
      `${REACT_APP_SERVER_URI}/${NOTIFICATION_API.PREFIX}/${NOTIFICATION_API.REGISTER}`,
      {
        token,
        platform: 'web',
      },
      { withCredentials: true }
    );
    return result;
  },
  generate2FAToken: async (data) => {
    try {
      const result = await http.post(
        `${REACT_APP_SERVER_URI}/users/generate2fa`,
        {
          password: data.password,
          username: data.username,
          userId: data.userId,
        },
        { responseType: 'blob' }
      );
      return { status: 'success', image: result.data };
    } catch (err) {
      console.log(err);
      return { status: 'fail', image: null };
    }
  },
  get2fa: async () => {
    try {
      const result = await http.get(`${REACT_APP_SERVER_URI}/users/get2fa`);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  },

  verify2FAToken: async (token) => {
    try {
      const result = await http.post(
        `${REACT_APP_SERVER_URI}/users/verify2fa`,
        {
          token: token,
        }
      );
      return result.data;
    } catch (err) {
      console.log(err);
      return result.data;
    }
  },
  save2fasetting: async (isEnable) => {
    try {
      const result = await http.post(
        `${REACT_APP_SERVER_URI}/users/enable2fa`,
        {
          isEnabled: isEnable,
        }
      );
      return result.data;
    } catch (err) {
      console.log(err);
    }
  },
};
