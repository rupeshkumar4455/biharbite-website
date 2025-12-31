import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      if (!data.isAdmin) {
        alert("You are not admin");
        return;
      }

      login(data); // ✅ SAVE ADMIN
      navigate("/admin/dashboard");
    } catch {
      alert("Admin login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-2"
      >
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
