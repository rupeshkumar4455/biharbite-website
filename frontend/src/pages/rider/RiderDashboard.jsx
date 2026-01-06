import { useEffect, useState } from "react";
import axios from "axios";

const RiderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("riderToken");
  const riderToken = localStorage.getItem("riderToken");
  const riderData = JSON.parse(localStorage.getItem("rider"));

  /* ===============================
     FETCH ASSIGNED ORDERS
     =============================== */
  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("riderToken");

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


  /* ===============================
     SEND LIVE LOCATION
     =============================== */
  const sendLocation = async (orderId) => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/rider/orders/${orderId}/location`,
            {
              lat: latitude,
              lng: longitude,
            },
            {
              headers: {
                Authorization: `Bearer ${riderToken}`,
              },
            }
          );
        } catch (err) {
          console.error("LOCATION UPDATE FAILED");
        }
      },
      () => {
        console.warn("Location permission denied");
      }
    );
  };

  /* ===============================
     AUTO LOCATION TRACKING (15s)
     =============================== */
  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach((order) => {
        if (
          order.deliveryStatus === "Picked Up" ||
          order.deliveryStatus === "On The Way"
        ) {
          sendLocation(order._id);
        }
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [orders]);

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

      // send location immediately when trip starts
      if (status === "Picked Up" || status === "On The Way") {
        sendLocation(orderId);
      }

      fetchOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);



    const updateDeliveryStatus = async (orderId, status) => {
  await axios.put(
    `${import.meta.env.VITE_API_URL}/api/rider/orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  fetchOrders();
};

  /* ===============================
     STATUS BADGE COLOR
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
        <p className="text-center text-gray-500">
          No orders assigned yet
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 bg-white shadow"
            >
              <div className="flex justify-between">
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

              <p className="text-sm mt-1">
                <strong>Customer:</strong>{" "}
                {order.user?.name}
              </p>
              <p className="text-sm">
                <strong>Total:</strong> ₹
                {order.totalAmount}
              </p>

              <div className="mt-4 flex gap-2 flex-wrap">
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
    onClick={() => updateDeliveryStatus(order._id, "Picked Up")}
    disabled={order.deliveryStatus !== "Assigned"}
    className={`px-4 py-1.5 rounded text-sm font-medium transition
      ${
        order.deliveryStatus === "Assigned"
          ? "bg-yellow-500 text-white hover:bg-yellow-600"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
  >
    📦 Picked Up
  </button>
                )}

                {order.deliveryStatus === "Picked Up" && (
                  <button
    onClick={() => updateDeliveryStatus(order._id, "On The Way")}
    disabled={order.deliveryStatus !== "Picked Up"}
    className={`px-4 py-1.5 rounded text-sm font-medium transition
      ${
        order.deliveryStatus === "Picked Up"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
  >
    🚴 On The Way
  </button>
                )}

                {order.deliveryStatus === "On The Way" && (
                  <button
    onClick={() => updateDeliveryStatus(order._id, "Delivered")}
    disabled={order.deliveryStatus !== "On The Way"}
    className={`px-4 py-1.5 rounded text-sm font-medium transition
      ${
        order.deliveryStatus === "On The Way"
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
  >
    ✅ Delivered
  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Tracking active while delivering
              </p>
            </div>
            
          ))}
        </div>
      )}
    </div>
    
  );
};

export default RiderDashboard;
