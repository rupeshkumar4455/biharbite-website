import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((i) => (
            <div className="cart-item" key={i.id}>
              <div>
                <strong>{i.name}</strong>
                <p>₹{i.price}</p>
              </div>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(i.id)}>-</button>
                <span>{i.quantity}</span>
                <button onClick={() => increaseQty(i.id)}>+</button>
              </div>

              <div>
                ₹{i.price * i.quantity}
                <br />
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(i.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
