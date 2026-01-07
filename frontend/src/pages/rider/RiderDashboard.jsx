import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 IMPORTANT: riderToken (not user/admin token)
  const riderToken = localStorage.getItem("riderToken");

  /* ===============================
     FETCH ASSIGNED ORDERS
     =============================== */
  const fetchOrders = async () => {
    try {
      if (!riderToken) {
        alert("Rider not logged in");
        navigate("/rider/login");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rider/orders`,
        {
          headers: {
            Authorization: `Bearer ${riderToken}`,
          },
        }
      );

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("RIDER FETCH ORDERS ERROR:", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("riderToken");
        navigate("/rider/login");
      } else {
        alert("Failed to load assigned orders");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     UPDATE DELIVERY STATUS
     =============================== */
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/rider/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${riderToken}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
      alert("Failed to update delivery status");
    }
  };

  /* ===============================
     SEND LIVE LOCATION
     =============================== */
  const sendLocation = (orderId) => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/rider/orders/${orderId}/location`,
            {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            {
              headers: {
                Authorization: `Bearer ${riderToken}`,
              },
            }
          );
        } catch (err) {
          console.error("LOCATION UPDATE ERROR:", err);
        }
      },
      () => alert("Unable to fetch location")
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ===============================
     STATUS BADGE STYLE
     =============================== */
  const statusBadge = (status) => {
    if (status === "Out for delivery")
      return "bg-blue-100 text-blue-700";
    if (status === "Delivered")
      return "bg-green-100 text-green-700";
    return "bg-yellow-100 text-yellow-700";
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading your assigned orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8">
        🚴 Rider Dashboard
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">
          No orders assigned yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-5 shadow bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm">
                  Order ID: {order._id}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(
                    order.deliveryStatus || order.orderStatus
                  )}`}
                >
                  {order.deliveryStatus || order.orderStatus}
                </span>
              </div>

              <p>
                <b>Customer:</b> {order.user?.name}
              </p>
              <p>
                <b>Phone:</b> {order.user?.phone || "N/A"}
              </p>
              <p>
                <b>Total Amount:</b> ₹{order.totalAmount}
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-5 flex flex-wrap gap-3">
                {(order.deliveryStatus === "Assigned" ||
                  order.orderStatus === "Placed") && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "Out for delivery")
                    }
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Start Delivery
                  </button>
                )}

                {order.deliveryStatus === "Out for delivery" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(order._id, "Delivered")
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Mark Delivered
                    </button>

                    <button
                      onClick={() => sendLocation(order._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Update Live Location
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
