// src/components/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ element, children }) {
  const { isAuthenticated } = useAuth();
  const page = element ?? children;
  const location = useLocation();

  return isAuthenticated
    ? page
    : <Navigate to="/login" state={{ from: location }} replace />;
}
