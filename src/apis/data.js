import axios from 'axios';
const { REACT_APP_SERVER_URI } = process.env;

export const Auth = {
  savePersonality: async (data) => {
    return await axios
      .post(`${REACT_APP_SERVER_URI}/users/login`, {
        type: data.type,
        value: data.value,
        token: data.token,
      })
      .catch((err) => console.log(err));
  },
};
