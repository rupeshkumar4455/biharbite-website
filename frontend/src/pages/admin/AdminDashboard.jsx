import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user]);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Order ID</th>
            <th>User</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t align-top">
              <td className="p-3">{o._id}</td>
              <td>{o.user?.email}</td>
              <td>
                {o.items.map((i, idx) => (
                  <div key={idx}>
                    {i.name} × {i.qty}
                  </div>
                ))}
              </td>
              <td>₹{o.totalAmount}</td>
              <td>{o.status}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option>Pending</option>
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
};

export default AdminDashboard;
