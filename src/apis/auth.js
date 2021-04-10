import axios from "axios";
const { REACT_APP_SERVER_URI } = process.env;

export const Auth = {
  login: async (data) => {
    console.log(data);
    return await axios
      .post(`${REACT_APP_SERVER_URI}/users/login`, {
        username: data.username,
        password: data.password,
      })
      .catch((err) => console.log(err));
  },
  logout: async () => {
    return await axios
      .post(`${REACT_APP_SERVER_URI}/logout`, {}, { withCredentials: true })
      .catch((err) => console.log(err));
  },
  signup: async (data) => {
    return await axios
      .post(`${REACT_APP_SERVER_URI}/users`, {
        username: data.username,
        fullName: data.fullName ? data.fullName : "name",
        password: data.password,
      })
      .catch((e) => console.log(e));
  },
  getUser: async (token) => {
    console.log(token);
    const res = await axios
      .post(`${REACT_APP_SERVER_URI}/users/check-token`, { token: token })
      .catch((e) => console.log(e));
    return res.data;
  },
};
