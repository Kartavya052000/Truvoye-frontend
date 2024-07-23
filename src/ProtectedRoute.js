// components/ProtectedRoute.js

import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = () => {
  const token = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
