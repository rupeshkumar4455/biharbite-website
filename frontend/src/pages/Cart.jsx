import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="cart-page">
        <h2>Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-layout">
            {/* LEFT - ITEMS */}
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>

                  <div className="cart-item-action">
                    <p className="item-total">
                      ₹{item.price * item.qty}
                    </p>
                    <button onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <p>Total Items: {cart.length}</p>
              <h3 className="grand-total">Total: ₹{totalPrice}</h3>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
