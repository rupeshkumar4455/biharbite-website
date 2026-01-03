import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminLogin = () => {
  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    if (id === "admin" && password === "admin123") {
      loginAdmin();
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          placeholder="Admin ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
