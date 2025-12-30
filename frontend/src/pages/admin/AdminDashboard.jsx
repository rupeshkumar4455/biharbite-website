import { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();
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

  return (
    <div className="admin-page">
      <div className="admin-box">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button
            onClick={() => {
              logoutAdmin();
              navigate("/admin/login");
            }}
          >
            Logout
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Items</th>
              <th>Total</th>
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
                    <option>Payment Pending</option>
                    <option>Paid</option>
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
    </div>
  );
}
