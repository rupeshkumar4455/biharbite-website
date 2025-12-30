import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  // ✅ TOTAL CALCULATION
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <div>
            <strong>{item.name}</strong>
            <p>₹{item.price}</p>
          </div>

          <div className="qty-controls">
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>

          <div>
            <p>₹{item.price * item.qty}</p>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* ✅ TOTAL DISPLAY */}
      <div className="cart-summary">
        <h3>Total: ₹{total}</h3>
        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
