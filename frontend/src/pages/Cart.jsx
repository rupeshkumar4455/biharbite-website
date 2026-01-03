import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔐 User not logged in → login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Your cart is empty
        </h2>
        <Link to="/" className="text-red-600 underline">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.map((item, index) => (
        <div
          key={item._id || index}
          className="flex justify-between items-center border p-4 mb-3 rounded"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold">
          Total: ₹{totalAmount}
        </h3>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
