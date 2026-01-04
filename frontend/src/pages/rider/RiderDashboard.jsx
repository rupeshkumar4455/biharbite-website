import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiderDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("riderToken");
  const rider = JSON.parse(localStorage.getItem("rider"));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) {
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.error("RIDER FETCH ORDERS ERROR:", err);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/rider/order/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">
        🚴 Rider Dashboard
      </h2>

      <p className="mb-8 text-gray-600">
        Welcome, <span className="font-semibold">{rider?.name}</span>
      </p>

      {orders.length === 0 ? (
        <p className="text-gray-500">
          No orders assigned yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-5 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">
                  Order #{order._id.slice(-6)}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm mb-1">
                👤 Customer: {order.user?.name}
              </p>
              <p className="text-sm mb-1">
                💳 Payment: {order.paymentMethod}
              </p>
              <p className="text-sm mb-3">
                📦 Status:{" "}
                <span className="font-semibold">
                  {order.orderStatus}
                </span>
              </p>

              <div className="flex gap-3">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option>Placed</option>
                  <option>Picked Up</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
