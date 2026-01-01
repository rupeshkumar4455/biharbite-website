import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminId,   // 👈 admin
          password,         // 👈 admin123
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Server error");
        return;
      }

      if (!data.isAdmin) {
        setError("Not authorized as admin");
        return;
      }

      // ✅ SAVE ADMIN SESSION
      login(data);

      // ✅ GO TO DASHBOARD
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("ADMIN LOGIN ERROR:", err);
      setError("Backend not reachable");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-sm border p-6 rounded"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
