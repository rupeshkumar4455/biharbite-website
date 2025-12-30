import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://biharbite-backend.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      }
    );

    if (res.ok) {
      alert("Signup successful, please login");
      navigate("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        <input name="name" placeholder="Full Name" required />
        <input name="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button>Create Account</button>
      </form>
    </div>
  );
}
