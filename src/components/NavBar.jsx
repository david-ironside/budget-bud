// src/components/NavBar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    navigate("/");
    await supabase.auth.signOut();
  };

  const AuthLinks = (
    <>
      <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
      <li><Link to="/account"   onClick={() => setMenuOpen(false)}>My Account</Link></li>
      <li><button onClick={handleLogout}>Logout</button></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow">
      {/* MOBILE */}
      <div className="navbar-start">
        {isAuthenticated && (
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {/* hamburger icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Budget Bud
        </Link>
      </div>

      {/* COLLAPSIBLE MENU */}
      {isAuthenticated && menuOpen && (
        <ul className="menu menu-compact bg-base-100 shadow-lg rounded-box p-2 absolute top-16 left-4 w-40 z-40 lg:hidden">
          {AuthLinks}
        </ul>
      )}

      {/* DESKTOP */}
      {isAuthenticated && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {AuthLinks}
          </ul>
        </div>
      )}

      {/* RIGHT SIDE */}
      <div className="navbar-end gap-2 pr-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login"    className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        ) : (
          <span className="hidden sm:inline text-sm text-gray-500">
            Signed in as <strong>{user.email}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
