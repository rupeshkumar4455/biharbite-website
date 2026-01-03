import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const cart = useCart();

  const user = auth?.user;
  const logout = auth?.logout;
  const isAdmin = auth?.user?.isAdmin;

  const cartItems = cart?.cartItems || [];
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

        <Link to="/" className="text-xl font-bold text-green-700">
          BiharBite
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>

          <Link to="/cart" className="relative">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <Link to="/my-orders">My Orders</Link>
          )}

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-blue-600 font-semibold"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
