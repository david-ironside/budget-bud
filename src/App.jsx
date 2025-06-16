// App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import TrialBanner from "./components/TrialBanner"; 
import { useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

export default function App() {
  const { isAuthenticated } = useAuth(); 

  return (
    <div
      data-theme="cupcake"
      className="min-h-screen bg-base-100 text-base-content"
    >
      {isAuthenticated && <TrialBanner />}
      <NavBar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </div>
  );
}
