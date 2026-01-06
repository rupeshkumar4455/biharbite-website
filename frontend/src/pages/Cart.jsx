import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  /* ===============================
     TOTAL AMOUNT
     =============================== */
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ===============================
     EMPTY CART UI
     =============================== */
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">
          🛒 Your Cart is Empty
        </h2>

        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Go to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8">
        Shopping Cart
      </h2>

      {/* ================= CART ITEMS ================= */}
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            {/* IMAGE + INFO */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>
                <p className="text-gray-600">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* QTY CONTROLS */}
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => decreaseQty(item._id)}
                className="w-8 h-8 border rounded text-xl hover:bg-gray-100"
              >
                −
              </button>

              <span className="font-semibold text-lg">
                {item.qty}
              </span>

              <button
                onClick={() => increaseQty(item._id)}
                className="w-8 h-8 border rounded text-xl hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* SUBTOTAL */}
            <div className="font-bold mt-4 sm:mt-0">
              ₹{item.price * item.qty}
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 hover:underline mt-4 sm:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 border-t pt-6">
        <h3 className="text-2xl font-bold">
          Total: ₹{totalAmount}
        </h3>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 sm:mt-0 bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
