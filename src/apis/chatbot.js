import axios from 'axios';

const { REACT_APP_BOT_URI_1, REACT_APP_BOT_URI_2 } = process.env;

export const Chatbot = {
  get_response: async (data) => {
    try {
      console.log(data);
      const res = await axios.post(
        `${
          data.type === 'chatbot1' ? REACT_APP_BOT_URI_1 : REACT_APP_BOT_URI_2
        }/get-response`,
        {
          text: data.text,
        },
        {
          withCredentials: data.type === 'chatbot2',
        }
      );
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
  init: async (personalities) => {
    try {
      const res = await axios.post(
        `${REACT_APP_BOT_URI_2}/init`,
        {
          personality: personalities,
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
  reset: async () => {
    try {
      const res = await axios.post(
        `${REACT_APP_BOT_URI_2}/reset`,
        {},
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return { status: 'error', error: err };
    }
  },
};
