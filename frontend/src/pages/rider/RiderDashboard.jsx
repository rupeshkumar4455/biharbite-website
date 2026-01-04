import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const riderToken = localStorage.getItem("riderToken");
  const rider = JSON.parse(localStorage.getItem("rider"));

  useEffect(() => {
    if (!riderToken) {
      navigate("/rider/login");
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rider/orders`,
        {
          headers: {
            Authorization: `Bearer ${riderToken}`,
          },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.error("RIDER ORDERS ERROR:", err);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("riderToken");
    localStorage.removeItem("rider");
    navigate("/rider/login");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          🚴 Welcome, {rider?.name}
        </h2>
        <button
          onClick={logoutHandler}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {orders.length === 0 ? (
        <p>No orders assigned yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded"
            >
              <p>
                <strong>Order ID:</strong>{" "}
                {order._id.slice(-6)}
              </p>
              <p>
                <strong>Customer:</strong>{" "}
                {order.user?.name}
              </p>
              <p>
                <strong>Total:</strong> ₹
                {order.totalAmount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.orderStatus}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
