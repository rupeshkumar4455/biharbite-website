import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.error("ADMIN FETCH ORDERS ERROR:", err);
    }
  };

  /* ===============================
     UPDATE STATUS
     =============================== */
  const updateStatus = async (id, status) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
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
     DELETE ORDER
     =============================== */
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchOrders();
  };

  /* ===============================
     DOWNLOAD INVOICE (PDF)
     =============================== */
  const downloadInvoice = (order) => {
    const content = `
BiharBite Invoice

Order ID: ${order._id}
Customer: ${order.user?.name}
Email: ${order.user?.email}

Items:
${order.items
  .map(
    (i) => `${i.name}  x${i.qty}  ₹${i.price * i.qty}`
  )
  .join("\n")}

Total: ₹${order.totalAmount}
Payment: ${order.paymentMethod}
Status: ${order.status}
Date: ${new Date(order.createdAt).toLocaleString()}
    `;

    const blob = new Blob([content], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${order._id}.txt`;
    link.click();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ===============================
     STATUS BADGE COLOR
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
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center text-sm">
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td>{order.user?.name}</td>
                <td>{order.user?.email}</td>
                <td>₹{order.totalAmount}</td>

                {/* STATUS */}
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className={`px-2 py-1 rounded ${statusColor(
                      order.status
                    )}`}
                  >
                    <option>Placed</option>
                    <option>Paid</option>
                    <option>Delivered</option>
                  </select>
                </td>

                {/* DATE */}
                <td>
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                {/* ACTIONS */}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* ===============================
         ORDER DETAIL MODAL
         =============================== */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">
              Order Details
            </h3>

            <p>
              <strong>User:</strong>{" "}
              {selectedOrder.user?.name}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {selectedOrder.user?.email}
            </p>

            <div className="mt-3">
              <strong>Items:</strong>
              <ul className="list-disc ml-5 text-sm">
                {selectedOrder.items.map((i, idx) => (
                  <li key={idx}>
                    {i.name} × {i.qty} = ₹
                    {i.price * i.qty}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3">
              <strong>Total:</strong> ₹
              {selectedOrder.totalAmount}
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              {selectedOrder.paymentMethod}
            </p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
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
