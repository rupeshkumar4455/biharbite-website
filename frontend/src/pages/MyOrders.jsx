import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const STATUS_STEPS = ["Placed", "Paid", "Delivered"];

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Protect page
  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 📦 Fetch orders
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
          setError(data.message || "Failed to load orders");
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
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 mb-6 bg-white shadow-sm"
          >
            {/* Order Header */}
            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>
                <b>Order ID:</b> {order._id}
              </span>
              <span>
                <b>Total:</b> ₹{order.totalAmount}
              </span>
            </div>

            {/* Items */}
            <div className="mb-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm"
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

            {/* 🔁 ORDER TRACKING TIMELINE */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">
                Order Tracking
              </h4>

              <div className="flex justify-between items-center">
                {STATUS_STEPS.map((step, index) => {
                  const currentIndex =
                    STATUS_STEPS.indexOf(order.orderStatus);

                  const isCompleted = index <= currentIndex;

                  return (
                    <div
                      key={step}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <span className="mt-2 text-xs text-center">
                        {step}
                      </span>

                      {index !== STATUS_STEPS.length - 1 && (
                        <div
                          className={`h-1 w-full mt-2 ${
                            isCompleted
                              ? "bg-green-600"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment info */}
            <div className="mt-4 text-sm text-gray-600">
              Payment: {order.paymentMethod} (
              {order.paymentStatus})
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
