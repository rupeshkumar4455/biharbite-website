import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.token) return;
    fetch(`${API_BASE}/api/orders`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders);
  }, []);


const navigate = useNavigate();

useEffect(() => {
  if (!user || !user.isAdmin) {
    navigate("/admin/login");
  }
}, [user, navigate]);


  const updateStatus = (id, status) => {
    fetch(`${API_BASE}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ orderStatus: status }),
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === id ? { ...o, orderStatus: status } : o
          )
        );
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td>{o.user?.name}</td>
              <td>₹{o.totalAmount}</td>
              <td>{o.orderStatus}</td>
              <td>
                <select
                  value={o.orderStatus}
                  onChange={(e) =>
                    updateStatus(o._id, e.target.value)
                  }
                >
                  <option>Placed</option>
                  <option>Paid</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
