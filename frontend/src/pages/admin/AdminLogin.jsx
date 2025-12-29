import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (username === "admin" && password === "admin123") {
      loginAdmin();
      navigate("/admin/dashboard", { replace: true });
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-box">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="Admin Username"
            required
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            style={{ width: "100%", padding: 10, marginBottom: 20 }}
          />

          <button className="checkout-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
