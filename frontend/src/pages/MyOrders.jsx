import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://biharbite-backend.onrender.com/api/orders/user/${user.id}`
    )
      .then((res) => res.json())
      .then(setOrders);
  }, [user]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map((o) => (
        <div className="order-card" key={o._id}>
          <p><b>Total:</b> ₹{o.total}</p>
          <p><b>Payment:</b> {o.paymentMethod}</p>

          <div className="timeline">
            <div className={o.status !== "Pending" ? "done" : ""}>
              Order Placed
            </div>
            <div className={o.status === "Paid" || o.status === "Delivered" ? "done" : ""}>
              Payment Confirmed
            </div>
            <div className={o.status === "Delivered" ? "done" : ""}>
              Delivered
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
