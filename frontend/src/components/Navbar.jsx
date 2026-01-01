import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-green-700"
        >
          Bihar<span className="text-orange-500">Bite</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-green-600"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {!user && (
            <>
              <Link to="/login" className="btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/my-orders" className="hover:text-green-600">
                My Orders
              </Link>
              <button
                onClick={logout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}

          {/* Admin */}
          <Link to="/admin/login" className="btn-outline">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
