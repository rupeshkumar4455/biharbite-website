import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>{orders.length}</p>
        </div>

        <div className="stat-card">
          <h4>Total Revenue</h4>
          <p>₹{totalRevenue}</p>
        </div>

        <div className="stat-card">
          <h4>Pending</h4>
          <p>{orders.filter(o => o.status === "Pending").length}</p>
        </div>

        <div className="stat-card">
          <h4>Delivered</h4>
          <p>{orders.filter(o => o.status === "Delivered").length}</p>
        </div>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items</th>
            <th>Total (₹)</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(-6)}</td>

              <td>
                {o.items.map((i, idx) => (
                  <div key={idx}>
                    {i.name} × {i.quantity} (₹{i.price})
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
