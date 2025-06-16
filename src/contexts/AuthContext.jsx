// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return data;
  };

  const checkOrInsertProfile = async (user) => {
    if (!user) return;

    const existingProfile = await fetchProfile(user.id);

    if (!existingProfile) {
      await supabase.from("profiles").insert({
        id: user.id,
        plan: "trial",
        trial_start: new Date(),
        trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      });

      const newProfile = await fetchProfile(user.id);
      setProfile(newProfile);
    } else {
      setProfile(existingProfile);
    }
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      if (currentUser) checkOrInsertProfile(currentUser);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const signedInUser = session?.user ?? null;
      setUser(signedInUser);
      setIsAuthenticated(!!signedInUser);
      if (signedInUser) checkOrInsertProfile(signedInUser);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, profile }}>
      {!loading ? children : <div className="p-6">Loading...</div>}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
