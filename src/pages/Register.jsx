// src/pages/Register.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Button from "../components/ui/Button";

const getRedirectUrl = () => `${window.location.origin}/dashboard`;

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm registration.");
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  };

  const handleOAuthSignup = async (provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getRedirectUrl() },
    });
    if (error) {
      console.error(`${provider} sign-in error:`, error.message);
      setMessage(`${provider} sign-up failed. Please try again.`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow p-6 space-y-3">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
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
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
          </Button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center text-red-500">{message}</p>
        )}

        <div className="divider">or</div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 font-semibold normal-case text-sm tracking-wide py-3"
          onClick={() => handleOAuthSignup("google")}
          disabled={loading}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 font-semibold normal-case text-sm tracking-wide py-3"
          onClick={() => handleOAuthSignup("facebook")}
          disabled={loading}
        >
          <FaFacebook className="text-xl text-[#1877F2]" />
          Continue with Facebook
        </Button>

      </div>
    </div>
  );
}
