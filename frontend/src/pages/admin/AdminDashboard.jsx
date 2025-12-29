import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>

      <h3>Orders</h3>
      {orders.map(o => (
        <div key={o._id} style={{ background: "#fff", padding: 15, margin: 10 }}>
          <p>Total: ₹{o.total}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}
