import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
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
          <button className="btn btn-primary w-full" type="submit">
            Login
          </button>
        </form>
        {message && (<p className={`text-sm mt-4 text-center ${ message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>)}
      </div>
    </div>
  );
}
