import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiApp, setUpiApp] = useState("");
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ===============================
     TOTAL AMOUNT
     =============================== */
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const UPI_ID = "6268947041@ibl"; // 🔴 CHANGE THIS
  const MERCHANT_NAME = "BiharBite";

  /* ===============================
     GENERATE QR
     =============================== */
  useEffect(() => {
    if (paymentMethod === "UPI" && upiApp) {
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${totalAmount}&cu=INR`;

      QRCode.toDataURL(upiUrl)
        .then((url) => setQr(url))
        .catch(() => setQr(""));
    } else {
      setQr("");
    }
  }, [paymentMethod, upiApp, totalAmount]);

  /* ===============================
     PLACE ORDER
     =============================== */
  const placeOrder = async () => {
    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    if (paymentMethod === "UPI" && !upiApp) {
      alert("Please select UPI app");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          items: cart,
          totalAmount,
          paymentMethod,
          paymentProvider:
            paymentMethod === "UPI" ? upiApp : paymentMethod,
          paymentStatus:
            paymentMethod === "UPI" ? "Paid (Manual)" : "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      alert("Order placed successfully 🎉");
      navigate("/my-orders");
    } catch (err) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* ================= CART SUMMARY ================= */}
      <div className="bg-white p-4 rounded shadow mb-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between text-sm mb-2"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <hr className="my-3" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* ================= PAYMENT METHODS ================= */}
      <div className="bg-white p-5 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">
          Select Payment Method
        </h3>

        {/* COD */}
        <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => {
              setPaymentMethod("COD");
              setUpiApp("");
            }}
          />
          Cash on Delivery (COD)
        </label>

        {/* UPI */}
        <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
          <input
            type="radio"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          UPI (Scan & Pay)
        </label>

        {paymentMethod === "UPI" && (
          <div className="ml-6 space-y-4">
            {/* UPI APPS */}
            <div className="flex gap-3">
              {["PhonePe", "Google Pay", "BHIM"].map((app) => (
                <button
                  key={app}
                  onClick={() => setUpiApp(app)}
                  className={`px-4 py-2 border rounded font-medium ${
                    upiApp === app
                      ? "bg-green-100 border-green-600"
                      : ""
                  }`}
                >
                  {app}
                </button>
              ))}
            </div>

            {/* QR + UPI ID */}
            {qr && (
              <div className="border rounded p-4 text-center">
                <p className="font-semibold mb-1">
                  Scan & Pay ₹{totalAmount}
                </p>

                <img
                  src={qr}
                  alt="UPI QR"
                  className="mx-auto w-52 my-2"
                />

                <p className="text-sm">
                  <b>UPI ID:</b> {UPI_ID}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  After payment, click Place Order
                </p>
              </div>
            )}
          </div>
        )}

        {/* CARD (UI ONLY) */}
        <label className="flex items-center gap-3 border p-3 rounded opacity-60 cursor-not-allowed">
          <input type="radio" disabled />
          Debit / Credit Card (Coming Soon)
        </label>

        {/* NET BANKING (UI ONLY) */}
        <label className="flex items-center gap-3 border p-3 rounded opacity-60 cursor-not-allowed">
          <input type="radio" disabled />
          Net Banking (Coming Soon)
        </label>
      </div>

      {/* ================= PLACE ORDER ================= */}
      <button
        onClick={placeOrder}
        disabled={loading}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded text-lg hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
