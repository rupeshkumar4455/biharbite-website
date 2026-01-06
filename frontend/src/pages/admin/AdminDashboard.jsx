import { useEffect, useState } from "react";
import axios from "axios";
import LiveMap from "../../components/LiveMap";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem("token");

  /* ===============================
     FETCH ORDERS
     =============================== */
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("ADMIN FETCH ORDERS ERROR:", err);
      setOrders([]);
    }
  };

  /* ===============================
     FETCH RIDERS
     =============================== */
  const fetchRiders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rider/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (Array.isArray(res.data)) setRiders(res.data);
      else if (Array.isArray(res.data?.riders))
        setRiders(res.data.riders);
      else setRiders([]);
    } catch (err) {
      console.error("FETCH RIDERS ERROR:", err);
      setRiders([]);
    }
  };

  /* ===============================
     ASSIGN RIDER  ✅ FIXED
     =============================== */
  const assignRider = async (orderId, riderId) => {
    if (!riderId) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/assign-rider`,
        { riderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔥 auto update UI
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? {
                ...o,
                rider: riders.find((r) => r._id === riderId),
                orderStatus: "Out for delivery",
              }
            : o
        )
      );
    } catch (err) {
      alert("Failed to assign rider");
    }
  };

  /* ===============================
     UPDATE STATUS
     =============================== */
  const updateStatus = async (id, orderStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        { status: orderStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch {}
  };

  /* ===============================
     DELETE ORDER
     =============================== */
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch {}
  };

  /* ===============================
     DOWNLOAD INVOICE
     =============================== */
  const downloadInvoice = (order) => {
    const items = Array.isArray(order.items) ? order.items : [];

    const content = `
BiharBite Invoice

Order ID: ${order._id}
Customer: ${order.user?.name || ""}
Email: ${order.user?.email || ""}

Items:
${items.map((i) => `${i.name} x${i.qty} ₹${i.price * i.qty}`).join("\n")}

Total: ₹${order.totalAmount}
Payment: ${order.paymentMethod}
Status: ${order.orderStatus}
Date: ${new Date(order.createdAt).toLocaleString()}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${order._id}.txt`;
    link.click();
  };

  useEffect(() => {
    fetchOrders();
    fetchRiders();
  }, []);

  /* ===============================
     STATUS STYLE
     =============================== */
  const statusBadge = (status) => {
    if (status === "Placed") return "bg-yellow-100 text-yellow-700";
    if (status === "Paid") return "bg-blue-100 text-blue-700";
    if (status === "Out for delivery")
      return "bg-purple-100 text-purple-700";
    if (status === "Delivered")
      return "bg-green-100 text-green-700";
    return "bg-gray-100";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8">
        📊 Admin Dashboard
      </h2>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Rider</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3">{order.user?.name}</td>
                  <td>{order.user?.email}</td>
                  <td className="font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-sm ${statusBadge(
                        order.orderStatus
                      )}`}
                    >
                      <option>Placed</option>
                      <option>Paid</option>
                      <option>Out for delivery</option>
                      <option>Delivered</option>
                    </select>
                  </td>

                  <td>
                    <select
                      value={order.rider?._id || ""}
                      onChange={(e) =>
                        assignRider(order._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded text-sm"
                    >
                      <option value="">
                        {order.rider
                          ? order.rider.name
                          : "Assign Rider"}
                      </option>
                      {riders.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => downloadInvoice(order)}
                      className="text-green-600 hover:underline"
                    >
                      Invoice
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= ORDER DETAIL MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Order Details
            </h3>

            <ul className="list-disc ml-5 text-sm mb-4">
              {(Array.isArray(selectedOrder.items)
                ? selectedOrder.items
                : []
              ).map((i, idx) => (
                <li key={idx}>
                  {i.name} × {i.qty} = ₹{i.price * i.qty}
                </li>
              ))}
            </ul>

            {selectedOrder?.riderLocation && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">
                  🚴 Live Rider Location
                </h4>
                <LiveMap
                  lat={selectedOrder.riderLocation.lat}
                  lng={selectedOrder.riderLocation.lng}
                />
              </div>
            )}

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-5 w-full bg-black text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
