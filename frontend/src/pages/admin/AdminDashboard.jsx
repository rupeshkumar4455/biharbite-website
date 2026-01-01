import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE } from "../../utils/api";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // 🔐 Admin protection
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  // 📦 Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${API_BASE}/api/orders`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    };

    if (user?.token) fetchOrders();
  }, [user]);

  const updateStatus = async (orderId, newStatus) => {
    await fetch(`${API_BASE}/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        orderStatus: newStatus,
        paymentStatus:
          newStatus === "Paid" || newStatus === "Delivered"
            ? "Paid"
            : "Pending",
      }),
    });

    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId
          ? { ...o, orderStatus: newStatus }
          : o
      )
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard – Orders
      </h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-2">
                {order.user?.name}
              </td>
              <td className="p-2">
                ₹{order.totalAmount}
              </td>
              <td className="p-2">
                {order.orderStatus}
              </td>
              <td className="p-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="Placed">Placed</option>
                  <option value="Paid">Paid</option>
                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
