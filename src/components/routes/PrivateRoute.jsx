// components/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}
