import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-[70vh]">
      <h2 className="text-2xl font-semibold mb-6">
        Your Cart
      </h2>

      <table className="w-full border mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-t text-center">
              <td className="p-3 text-left">
                {item.name}
              </td>
              <td>{item.qty}</td>
              <td>₹{item.price * item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          Total: ₹{total}
        </h3>

        <Link
          to="/checkout"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
