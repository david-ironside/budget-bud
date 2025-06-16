// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Button from "../components/ui/Button";

const getRedirectUrl = () => `${window.location.origin}/dashboard`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
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
      setTimeout(() => navigate("/dashboard"), 500);
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getRedirectUrl() },
    });
    if (error) {
      console.error(`${provider} sign-in error:`, error.message);
      setMessage(`${provider} login failed. Please try again.`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow p-6 space-y-3">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h2>
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
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
          </Button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="divider">or</div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 font-semibold normal-case text-sm tracking-wide py-3"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>


        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 font-semibold normal-case text-sm tracking-wide py-3"
          onClick={() => handleOAuthLogin("facebook")}
          disabled={loading}
        >
          <FaFacebook className="text-xl" />
          Continue with Facebook
        </Button>

      </div>
    </div>
  );
}