import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700">
          Bihar<span className="text-orange-500">Bite</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/">Home</Link>

          <Link to="/cart">
            Cart ({cartItems.length})
          </Link>

          {/* USER AUTH */}
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/my-orders">My Orders</Link>
              <button
                onClick={logout}
                className="text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* 🔐 ADMIN ENTRY (ALWAYS VISIBLE) */}
          <Link
            to="/admin/login"
            className="border px-3 py-1 rounded hover:bg-gray-100"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
