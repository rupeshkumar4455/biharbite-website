import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "admin" && password === "admin123") {
      loginAdmin();
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="Admin Username"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
