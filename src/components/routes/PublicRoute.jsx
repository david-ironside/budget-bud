// components/routes/PublicRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PublicRoute({ element }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (isAuthenticated && location.pathname !== "/dashboard") {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
}
