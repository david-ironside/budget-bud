// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return data;
  };

  const ensureProfile = async (user) => {
    if (!user) return;

    const existing = await fetchProfile(user.id);
    if (!existing) {
      await supabase.from("profiles").insert({
        id: user.id,
        plan: "trial",
        trial_start: new Date(),
        trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      });
      const newProfile = await fetchProfile(user.id);
      setProfile(newProfile);
    } else {
      setProfile(existing);
    }
  };

  useEffect(() => {
    // Initial session load
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      if (currentUser) ensureProfile(currentUser);
      setLoading(false);
    });

    // Auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const signedInUser = session?.user ?? null;
      setUser(signedInUser);
      setIsAuthenticated(!!signedInUser);

      if (signedInUser) {
        ensureProfile(signedInUser);
        navigate("/dashboard");
      } else {
        setProfile(null);
        const publicRoutes = ["/", "/login", "/register"];
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/");
        }
      }      
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, profile, loading }}>
      {loading ? <div className="p-6">Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
