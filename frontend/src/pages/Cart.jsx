import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // 🔴 EMPTY CART UI
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-3">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
        >
          Go to Shopping
        </Link>
      </div>
    );
  }

  // 🟢 NORMAL CART UI (unchanged)
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-red-600 font-bold">
                ₹{item.price}
              </p>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 text-right">
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
