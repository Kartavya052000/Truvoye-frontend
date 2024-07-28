// hooks/useAuth.js

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuth = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login'); // Redirect to login if token is not present
    }
  }, [cookies.token, navigate]);

  return cookies.token;
};

export default useAuth;
