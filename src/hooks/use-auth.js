import React, { useState, useContext, createContext, useEffect } from 'react';
import { Auth } from '../apis/auth';
import Loading from '../components/Loading';
import { useLocalStorage } from './use-localstorage';
import { message } from 'antd';
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
    Auth.login(data).then((response) => {
      if (response && response.success === true) {
        console.log('dsa');
        setUser(response.result);
        setToken(response.result.token);
      } else if (response.status == 'error') {
        setUser(false);
        toast('Username or password is incorrect.', { position: 'top-center' });
      }
      return response;
    });
  };

  const signup = (data) => {
    Auth.signup(data).then((response) => {
      if (response && response.success === true) {
        setUser(response.result);
        toast('Account created', { position: 'top-center' });
      } else {
        setUser(false);
        setToken('');
        toast('Error creating account', { position: 'top-center' });
      }
      return response;
    });
  };

  const logout = () => {
    setUser(false);
    setToken('');
    return { status: 'success' };
  };

  return {
    user,
    login,
    signup,
    logout,
    loading,
  };
}
