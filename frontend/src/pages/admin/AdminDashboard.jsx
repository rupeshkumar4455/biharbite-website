import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch(
      "https://biharbite-backend.onrender.com/api/orders"
    );
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(
      `https://biharbite-backend.onrender.com/api/orders/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order permanently?")) return;

    await fetch(
      `https://biharbite-backend.onrender.com/api/orders/${id}`,
      { method: "DELETE" }
    );
    fetchOrders();
  };

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  );

  return (
    <div className="admin-page">
      <div className="admin-box">
        <h2>Admin Dashboard</h2>

        {/* STATS */}
        <div className="admin-stats">
          <div className="stat-card">
            <p>Total Orders</p>
            <h3>{orders.length}</h3>
          </div>

          <div className="stat-card">
            <p>Total Revenue</p>
            <h3>₹{totalRevenue}</h3>
          </div>
        </div>

        {/* ORDERS TABLE */}
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(-6)}</td>

                <td>
                  {o.items.map((i, idx) => (
                    <div key={idx}>
                      {i.name} × {i.qty}
                    </div>
                  ))}
                </td>

                <td>₹{o.total}</td>
                <td>{o.paymentMethod}</td>

                <td>
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateStatus(o._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Delivered</option>
                  </select>
                </td>

                <td>
                  {new Date(o.createdAt).toLocaleString()}
                </td>

                <td>
                  <button
                    className="delete-btn"
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
    </div>
  );
}
