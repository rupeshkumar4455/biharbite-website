import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    console.log("API URL =", import.meta.env.VITE_API_URL);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      login({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">User Login</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-red-600 text-white py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
