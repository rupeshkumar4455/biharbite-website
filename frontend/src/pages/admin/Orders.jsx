import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/all")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Orders</h2>

      {orders.map(o => (
        <div key={o._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><b>{o.customerName}</b> ({o.phone})</p>
          <p>{o.address}</p>
          <p>Total: ₹{o.totalAmount}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}
