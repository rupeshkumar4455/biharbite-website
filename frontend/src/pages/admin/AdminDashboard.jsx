import { useEffect, useState } from "react";
import { API_BASE } from "../../utils/api";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch(`${API_BASE}/api/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE}/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await fetch(`${API_BASE}/api/orders/${id}`, {
      method: "DELETE",
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Admin Dashboard</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t text-center">
              <td>{o.user?.email}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.paymentMethod}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Delivered</option>
                </select>
              </td>
              <td>
                <button
                  className="text-red-600"
                  onClick={() => deleteOrder(o._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
