import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ===============================
     FETCH MY ORDERS
     =============================== */
  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      // 🔐 if user not logged in
      if (!token) {
        alert("Please login to view your orders");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);
    } catch (error) {
      console.error("MY ORDERS FETCH ERROR:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        alert("Failed to load orders");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     AUTO REFRESH (LIVE UPDATE)
     =============================== */
  useEffect(() => {
    fetchMyOrders();

    // 🔁 auto refresh every 10 sec
    const interval = setInterval(fetchMyOrders, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-600">
          You have not placed any orders yet.
        </p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded p-4 mb-4 shadow-sm"
        >
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Order ID: {order._id}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          <p>
            <b>Total:</b> ₹{order.totalAmount}
          </p>

          <p>
            <b>Payment Method:</b> {order.paymentMethod}
          </p>

          <p>
            <b>Order Status:</b>{" "}
            <span className="font-semibold">
              {order.orderStatus}
            </span>
          </p>

          <p>
            <b>Delivery Status:</b>{" "}
            <span className="text-blue-600 font-semibold">
              {order.deliveryStatus}
            </span>
          </p>

          <p>
            <b>Payment Status:</b> {order.paymentStatus}
          </p>

          {/* ITEMS */}
          <div className="mt-3">
            <p className="font-medium mb-1">Items:</p>
            <ul className="list-disc ml-5 text-sm">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.qty || 1} — ₹{item.price}
                </li>
              ))}
            </ul>
          </div>

          {/* TRACK LIVE BUTTON */}
          {order.deliveryStatus !== "Delivered" && (
            <div className="mt-3">
              <Link
                to={`/track/${order._id}`}
                className="text-blue-600 underline text-sm"
              >
                Track Live
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
