import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../utils/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  // 🔒 HARD PROTECTION
  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return; // ⛔ stop API call

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("ADMIN FETCH ORDERS ERROR:", err.message);
      }
    };

    fetchOrders();
  }, [isAdmin]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Admin Dashboard</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>User</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.user?.email}</td>
                <td>₹{o.totalAmount}</td>
                <td>{o.paymentMethod}</td>
                <td>{o.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
