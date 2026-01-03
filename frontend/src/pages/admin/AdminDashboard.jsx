import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  /* ===============================
     FETCH ALL ORDERS
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
     UPDATE ORDER STATUS
     =============================== */
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard – Orders
      </h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="border px-3 py-2">User</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Amount</th>
                <th className="border px-3 py-2">Payment</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Order Date</th>
              </tr>
            </thead>

            <tbody className="text-sm text-center">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  {/* USER NAME */}
                  <td className="border px-3 py-2">
                    {order.user?.name || "N/A"}
                  </td>

                  {/* USER EMAIL */}
                  <td className="border px-3 py-2">
                    {order.user?.email || "N/A"}
                  </td>

                  {/* TOTAL */}
                  <td className="border px-3 py-2 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  {/* PAYMENT METHOD */}
                  <td className="border px-3 py-2">
                    {order.paymentMethod}
                  </td>

                  {/* STATUS (EDITABLE) */}
                  <td className="border px-3 py-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Paid">Paid</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  {/* DATE & TIME */}
                  <td className="border px-3 py-2 text-xs">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
