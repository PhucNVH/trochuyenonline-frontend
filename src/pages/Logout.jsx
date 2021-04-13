import React, { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';

export const Logout = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.logout().then((res) => console.log(res));
  });
  return <div></div>;
};
