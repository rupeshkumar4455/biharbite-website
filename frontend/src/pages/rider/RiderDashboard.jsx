import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiderDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("riderToken");

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
      console.error("RIDER ORDERS ERROR:", err);
    }
  };

  const updateStatus = async (orderId, deliveryStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/rider/orders/${orderId}/status`,
        { deliveryStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      alert("Status update failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("riderToken");
    localStorage.removeItem("rider");
    navigate("/rider/login");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[70vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Rider Dashboard
        </h2>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-600">
          No assigned orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded shadow-sm"
            >
              <p className="text-sm text-gray-500">
                Order ID
              </p>
              <p className="font-medium mb-2">
                {order._id}
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
                {order.deliveryStatus}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Accepted",
                  "Picked Up",
                  "Out for Delivery",
                  "Delivered",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      updateStatus(order._id, status)
                    }
                    className="border px-3 py-1 rounded hover:bg-gray-100"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
