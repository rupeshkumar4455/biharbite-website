import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          Bihar<span className="text-orange-500">Bite</span>
        </Link>

        {/* LINKS */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-orange-500">
            Home
          </Link>

          <Link to="/cart" className="hover:text-orange-500">
            Cart ({cartCount})
          </Link>

          {/* NOT LOGGED IN */}
          {!user && (
            <>
              <Link to="/login" className="hover:text-orange-500">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-4 py-1 rounded"
              >
                Signup
              </Link>
            </>
          )}

          {/* LOGGED IN */}
          {user && (
            <>
              {user.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="font-semibold text-blue-600"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
