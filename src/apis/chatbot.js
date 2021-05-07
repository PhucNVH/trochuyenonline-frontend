import axios from 'axios';

const { REACT_APP_BOT_URI } = process.env;

export const Chatbot = {
  get_response: async (data) => {
    try {
      const res = await axios.post(
        `${REACT_APP_BOT_URI}/get-response`,
        {
          text: data.text,
        },
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
  init: async () => {
    try {
      const res = await axios.get(`${REACT_APP_BOT_URI}/init`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
};
