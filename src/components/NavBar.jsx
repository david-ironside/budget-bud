import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      navigate("/login"); // Redirect after logout
    }
  };
  

  return (
    <div className="navbar bg-base-100 shadow mb-6">
      <div className="flex-1 px-4 font-bold text-lg">
        <Link to="/">Budget Bud</Link>
        {user && (
          <span className="ml-4 text-sm text-gray-500 hidden sm:inline">
            Signed in as <strong>{user.email}</strong>
          </span>
        )}
      </div>
      <div className="flex-none gap-2 px-4">
        {!isAuthenticated ? (
          <>
            <Link className="btn btn-outline btn-sm" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary btn-sm" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button className="btn btn-error btn-sm" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
