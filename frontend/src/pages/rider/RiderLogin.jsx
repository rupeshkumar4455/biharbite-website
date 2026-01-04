import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rider/login`,
        { email, password }
      );

      localStorage.setItem("rider", JSON.stringify(res.data));
      localStorage.setItem("riderToken", res.data.token);

      navigate("/rider/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Rider login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Rider Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-3 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-3 px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default RiderLogin;
