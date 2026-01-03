import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Your cart is empty 🛒
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border p-4 rounded"
          >
            {/* PRODUCT INFO */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* QTY CONTROLS */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item._id)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                −
              </button>
              <span className="font-medium">
                {item.qty}
              </span>
              <button
                onClick={() => increaseQty(item._id)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* PRICE */}
            <div className="font-semibold">
              ₹{item.price * item.qty}
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="mt-8 flex justify-between items-center border-t pt-6">
        <h3 className="text-xl font-bold">
          Total: ₹{totalAmount}
        </h3>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
