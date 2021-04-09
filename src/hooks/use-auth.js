import React, { useState, useContext, createContext, useEffect } from "react";
import { Auth } from "../apis/auth";
import Loading from "../components/Loading";
import { useLocalStorage } from "./use-localstorage";

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
  const parts = value.split(`; ${"remember_token"}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("token", "");
  const [loading, setLoading] = useState(token === "" ? false : true);

  useEffect(() => {
    if (loading) {
      Auth.getUser(token).then((data) => {
        console.log(token);
        setUser(data.result ? data.result : false);
        setLoading(false);
      });
    }
  }, []);

  const login = (data) => {
    return Auth.login(data)
      .catch((e) => console.log(e))
      .then((response) => {
        console.log(response);
        if (response.data && response.data.success === true) {
          setUser(response.data.result);
          console.log(response, token);
          setToken(response.data.result.token);
        } else {
          setUser(false);
        }
        return response.data;
      });
  };

  const signup = (data) => {
    return Auth.signup(data).then((response) => {
      console.log(response);
      if (response.data && response.data.success === true) {
        setUser(response.data.result);
      } else {
        setUser(false);
        setToken("");
      }
      return response.data;
    });
  };

  const logout = () => {
    return Auth.logout().then((res) => {
      setUser(false);
      setToken("");
      return res.data;
    });
  };

  return {
    user,
    login,
    signup,
    logout,
    loading,
  };
}
