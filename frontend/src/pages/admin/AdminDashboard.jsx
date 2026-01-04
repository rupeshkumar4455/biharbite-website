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

      // ✅ FORCE ARRAY
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

      // ✅ HANDLE ALL CASES
      if (Array.isArray(res.data)) {
        setRiders(res.data);
      } else if (Array.isArray(res.data?.riders)) {
        setRiders(res.data.riders);
      } else {
        setRiders([]);
      }
    } catch (err) {
      console.error("FETCH RIDERS ERROR:", err);
      setRiders([]);
    }
  };

  /* ===============================
     ASSIGN RIDER
     =============================== */
  const assignRider = async (orderId, riderId) => {
    if (!riderId) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/assign-rider`,
        { riderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch {
      alert("Failed to assign rider");
    }
  };

  /* ===============================
     UPDATE STATUS
     =============================== */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
${items
  .map((i) => `${i.name} x${i.qty} ₹${i.price * i.qty}`)
  .join("\n")}

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
     STATUS COLOR
     =============================== */
  const statusColor = (status) => {
    if (status === "Placed") return "bg-yellow-100 text-yellow-700";
    if (status === "Paid") return "bg-blue-100 text-blue-700";
    if (status === "Delivered") return "bg-green-100 text-green-700";
    return "bg-gray-100";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard – Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
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
                  <td>{order.user?.name}</td>
                  <td>{order.user?.email}</td>
                  <td>₹{order.totalAmount}</td>

                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded ${statusColor(
                        order.orderStatus
                      )}`}
                    >
                      <option>Placed</option>
                      <option>Paid</option>
                      <option>Delivered</option>
                    </select>
                  </td>

                  <td>
                    <select
                      value={order.rider?._id || ""}
                      onChange={(e) =>
                        assignRider(order._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="">
                        {order.rider
                          ? order.rider.name
                          : "Assign Rider"}
                      </option>

                      {Array.isArray(riders) &&
                        riders.map((r) => (
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
                      className="text-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => downloadInvoice(order)}
                      className="text-green-600"
                    >
                      Invoice
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-600"
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

      {/* ORDER DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">
              Order Details
            </h3>

            <ul className="list-disc ml-5 text-sm">
              {(Array.isArray(selectedOrder.items)
                ? selectedOrder.items
                : []
              ).map((i, idx) => (
                <li key={idx}>
                  {i.name} × {i.qty} = ₹{i.price * i.qty}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Close
            </button>

{selectedOrder?.riderLocation && (
  <div className="mt-4">
    <h4 className="font-semibold mb-2">Live Rider Location</h4>
    <LiveMap
      lat={selectedOrder.riderLocation.lat}
      lng={selectedOrder.riderLocation.lng}
    />
  </div>
)}


            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
