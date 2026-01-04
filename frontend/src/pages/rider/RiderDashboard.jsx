import { useEffect, useState } from "react";
import axios from "axios";

const RiderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const riderToken = localStorage.getItem("riderToken");
  const riderData = JSON.parse(localStorage.getItem("rider"));

  /* ===============================
     FETCH ASSIGNED ORDERS
     =============================== */
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

      // ✅ Force array
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("RIDER FETCH ORDERS ERROR:", err);
      setOrders([]);
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
      fetchOrders(); // refresh
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ===============================
     STATUS COLOR
     =============================== */
  const statusColor = (status) => {
    if (status === "Assigned") return "bg-yellow-100 text-yellow-700";
    if (status === "Accepted") return "bg-blue-100 text-blue-700";
    if (status === "Picked Up") return "bg-purple-100 text-purple-700";
    if (status === "On The Way") return "bg-orange-100 text-orange-700";
    if (status === "Delivered") return "bg-green-100 text-green-700";
    return "bg-gray-100";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">
        Rider Dashboard
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Welcome, {riderData?.name}
      </p>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No orders assigned yet 🚴
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 bg-white shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  Order #{order._id.slice(-6)}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded ${statusColor(
                    order.deliveryStatus
                  )}`}
                >
                  {order.deliveryStatus}
                </span>
              </div>

              <div className="mt-2 text-sm">
                <p>
                  <strong>Customer:</strong>{" "}
                  {order.user?.name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {order.user?.email}
                </p>
                <p>
                  <strong>Total:</strong> ₹
                  {order.totalAmount}
                </p>
              </div>

              {/* ITEMS */}
              <div className="mt-3">
                <strong className="text-sm">Items:</strong>
                <ul className="list-disc ml-5 text-sm">
                  {Array.isArray(order.items) &&
                    order.items.map((i, idx) => (
                      <li key={idx}>
                        {i.name} × {i.qty}
                      </li>
                    ))}
                </ul>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-4 flex flex-wrap gap-2">
                {order.deliveryStatus === "Assigned" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "Accepted")
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                )}

                {order.deliveryStatus === "Accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "Picked Up")
                    }
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    Picked Up
                  </button>
                )}

                {order.deliveryStatus === "Picked Up" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "On The Way")
                    }
                    className="bg-orange-600 text-white px-3 py-1 rounded"
                  >
                    On The Way
                  </button>
                )}

                {order.deliveryStatus === "On The Way" && (
                  <button
                    onClick={() =>
                      updateStatus(order._id, "Delivered")
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Delivered
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Assigned on{" "}
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
