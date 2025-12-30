import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://biharbite-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      navigate("/");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          New user?{" "}
          <span
            style={{ color: "#c65b12", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Create account
          </span>
        </p>
      </form>
    </div>
  );
}
