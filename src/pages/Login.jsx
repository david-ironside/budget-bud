import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from "react-icons/fa"; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("🔐 Login attempt:", email);
  
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log("🔁 Supabase response:", { data, error });

  
    if (error) {
      const msg = error.message.toLowerCase();
  
      if (msg.includes("email not confirmed")) {
        setMessage("Please confirm your email address before logging in.");
      } else if (msg.includes("invalid login credentials")) {
        setMessage("Incorrect email or password.");
      } else {
        setMessage("Login failed: " + error.message);
      }
    } else {
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
    setLoading(false); 
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://budget-bud-red.vercel.app/dashboard'
      }
    });
  
    if (error) {
      console.error("Google sign-in error:", error.message);
      setMessage("Google login failed. Please try again.");
    }
    setLoading(false); 
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "https://budget-bud-red.vercel.app/dashboard",
      },
    });
    if (error) {
      console.error("Facebook sign-in error:", error.message);
      setMessage("Facebook login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="card w-full max-w-sm shadow bg-base-100 p-6">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`} type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
        <div className="mt-3">
          <button
            className="btn btn-outline w-full flex items-center justify-center space-x-2 py-2 px-4"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
          <button
            className="btn btn-outline w-full flex items-center justify-center mt-2"
            onClick={handleFacebookLogin}
            disabled={loading}
          >
            <FaFacebook className="text-xl mr-2 text-[#1877F2]" />
            Continue with Facebook
          </button>
        </div>
       {message && (<p className={`text-sm mt-4 text-center ${ message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>)}
      </div>
    </div>
  );
}