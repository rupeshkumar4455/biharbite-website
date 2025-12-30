import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [showUPI, setShowUPI] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  // 🔴 APNI REAL UPI ID DALO
  const UPI_ID = "6268947041@ibl";

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=BiharBite&am=${totalAmount}&cu=INR&tn=BiharBite%20Order`;

  // COD
  const placeCOD = async () => {
    await fetch("https://biharbite-backend.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        total: totalAmount,
        paymentMethod: "COD",
        status: "Pending",
      }),
    });

    clearCart();
    navigate("/order-placed");
  };


  
  // PHONEPE / UPI
  const startUPIPayment = async () => {
    setShowUPI(true);

    await fetch("https://biharbite-backend.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        total: totalAmount,
        paymentMethod: "PHONEPE_UPI",
        status: "Payment Pending",
      }),
    });
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-card">
        <h2>Checkout</h2>
        <p>Total Amount: ₹{totalAmount}</p>

        {!showUPI && (
          <div className="payment-buttons">
            <button onClick={placeCOD}>Cash on Delivery</button>
            <button className="online-btn" onClick={startUPIPayment}>
              Pay via PhonePe / UPI
            </button>
          </div>
        )}

        {showUPI && (
          <div className="upi-box">
            <h3>Scan & Pay</h3>

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                upiLink
              )}`}
              alt="UPI QR"
            />

            <p>
              Complete payment using PhonePe / GPay / Paytm
            </p>

            <p style={{ fontSize: 13, color: "#b00" }}>
              ⚠️ Payment will be verified by admin before confirmation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
