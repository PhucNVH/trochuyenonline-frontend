import axios from 'axios';
import { message } from 'antd';
import { handleResponseError } from '../utils/apis.util';
import { removeFromStorage, saveToSession } from '../utils/storage.util';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (!!localStorage.getItem('token')) {
    config.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
  }
  config.headers.common['Access-Control-Allow-Origin'] = '*';
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      message.error('Unknown error happened! Please contact admin for support');
      return handleResponseError(error);
    }
    const { data } = error.response;
    const { detailError, path } = data;

    let messageDetail = '';

    if (error.response.status === 403) {
      removeFromStorage('token');
      if (!window.location.pathname.includes('dang-nhap'))
        window.location.replace('/');
    }

    if (error.response.status === 402) {
      saveToSession('checkSubscription', true);
      return 'checkSubscription';
    }

    if (detailError) {
      if (Array.isArray(detailError.message))
        messageDetail = detailError.message[0];
      else messageDetail = detailError.message;
    } else {
      messageDetail = data.message;
    }

    message.error(messageDetail);

    if (error.response.status === 400 && path.includes('subscription')) {
      return data;
    }

    return handleResponseError(error);
  }
);

export default axiosInstance;
