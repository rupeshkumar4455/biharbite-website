import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔒 Protect page (login required)
  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 📦 Fetch my orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/orders/my`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch orders");
          setLoading(false);
          return;
        }

        setOrders(data);
      } catch {
        setError("Backend not reachable");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded p-4 mb-4"
          >
            <div className="flex justify-between mb-2 text-sm">
              <span>
                <strong>Order ID:</strong>{" "}
                {order._id}
              </span>
              <span>
                <strong>Status:</strong>{" "}
                {order.orderStatus}
              </span>
            </div>

            <div className="mb-2 text-sm">
              <strong>Payment:</strong>{" "}
              {order.paymentMethod} (
              {order.paymentStatus})
            </div>

            <div className="mb-3">
              <strong>Items:</strong>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="text-sm flex justify-between"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-right font-semibold">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
