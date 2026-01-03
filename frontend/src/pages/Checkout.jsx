import { useState } from "react";
import { useCart } from "../context/CartContext";
import QRCode from "react-qr-code";

const UPI_ID = "6268947041@ibl"; // 🔴 apna UPI yahan daalo

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [method, setMethod] = useState("");
  const [showQR, setShowQR] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=BiharBite&am=${total}&cu=INR`;

  const placeOrder = () => {
    alert("Order placed successfully");
    clearCart();
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <p className="mb-4">Total Amount: ₹{total}</p>

      <div className="space-y-3">
        <button
          onClick={() => {
            setMethod("COD");
            setShowQR(false);
          }}
          className="border px-4 py-2 w-full"
        >
          Cash on Delivery
        </button>

        <button
          onClick={() => {
            setMethod("UPI");
            setShowQR(true);
          }}
          className="border px-4 py-2 w-full"
        >
          Pay via UPI
        </button>
      </div>

      {showQR && (
        <div className="mt-6 text-center">
          <QRCode value={upiLink} />
          <p className="mt-2 text-sm">Scan & Pay</p>
        </div>
      )}

      {method && (
        <button
          onClick={placeOrder}
          className="bg-red-600 text-white px-6 py-2 mt-6 w-full"
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default Checkout;
