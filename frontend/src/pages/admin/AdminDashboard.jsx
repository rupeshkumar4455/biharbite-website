import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Admin token missing. Please login again.");
          return;
        }

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
        alert("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Admin Dashboard</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.length > 0 && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t text-center">
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
