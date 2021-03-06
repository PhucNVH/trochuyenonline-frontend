import React, { useState, useContext, createContext, useEffect } from 'react';
import { Auth } from '../apis/auth';
import Loading from '../components/Loading';
import { useLocalStorage } from './use-localstorage';
import { toast } from 'react-toastify';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {auth.loading ? <Loading loading={auth.loading}></Loading> : children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function getRememberCookie() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${'remember_token'}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('token', '');
  const [loading, setLoading] = useState(token === '' ? false : true);

  useEffect(() => {
    if (loading) {
      Auth.getUser(token).then((data) => {
        if (data.status === 'error') {
          toast(data.error.toString(), { position: 'top-center' });
          setUser(false);
        } else {
          setUser(data.result ? data.result : false);
        }
        setLoading(false);
      });
    }
  }, []);

  const login = (data) => {
    return Auth.login(data).then((response) => {
      if (response && response.success === true) {
        if (response.result.isTwoFactorAuthenticationEnabled) {
          setToken(response.result.token);
          return response;
        }
        setUser(response.result);
        setToken(response.result.token);
        // const deviceId = retrieveFromStorage(LOCAL_STORAGE_KEY.DEVICE_TOKEN);
        // if (deviceId) {
        //   Auth.registerToken(deviceId);
        // }
      } else if (response.status == 'error') {
        setUser(false);
        toast('Username or password is incorrect.', { position: 'top-center' });
      }
      return response;
    });
  };

  const signup = (data) => {
    return Auth.signup(data).then((response) => {
      setUser(false);
      if (response && response.success === true) {
        toast('Account created', { position: 'top-center' });
      } else {
        setToken('');
        toast('Error creating account', { position: 'top-center' });
      }
      return response;
    });
  };

  const verify2FAToken = (token) => {
    return Auth.verify2FAToken(token).then((response) => {
      console.log(response);
      if (response && response.success === true && response.result != null) {
        setUser(response.result);
        setToken(response.result.token);
      } else if (response.status == 'error') {
        setUser(false);
        toast('Error', { position: 'top-center' });
      }
      return response;
    });
  };

  const logout = () => {
    setUser(false);
    setToken('');
    return { success: true };
  };

  return {
    user,
    login,
    signup,
    logout,
    loading,
    verify2FAToken,
  };
}
