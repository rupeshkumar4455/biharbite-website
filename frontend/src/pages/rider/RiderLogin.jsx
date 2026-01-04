import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiderLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rider/login`,
        { email, password }
      );

      localStorage.setItem("riderToken", res.data.token);
      localStorage.setItem("rider", JSON.stringify(res.data.rider));

      navigate("/rider/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Rider login failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Rider Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-3 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-red-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RiderLogin;
