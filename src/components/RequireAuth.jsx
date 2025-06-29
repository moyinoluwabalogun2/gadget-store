// src/components/RequireAuth.jsx
import { useAdmin } from '../context/AdminContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/admin" replace />;
};

export default RequireAuth;