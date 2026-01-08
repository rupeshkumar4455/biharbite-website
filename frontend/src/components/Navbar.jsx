import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const isAdmin = user?.isAdmin === true;
  const isAdminPage = location.pathname.startsWith("/admin");

  /* ===============================
     LOGOUT HANDLERS
     =============================== */

  const userLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const adminLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
  <img
    src="/images/logo.png"
    alt="BiharBite Logo"
    className="h-12 md:h-14 w-auto object-contain"
  />
  <span className="text-2xl font-extrabold text-red-600 tracking-wide">
    Bihar<span className="text-red-500">Bite</span>
  </span>
</Link>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm font-semimedium">

          {/* ================= HOME ================= */}
          {!isAdminPage && (
            <Link to="/" className="hover:text-red-600 transition" >
              Home
            </Link>
          )}

          {/* ================= CART ================= */}
          {!isAdmin && (
            <Link to="/cart" className="relative hover:text-red-600 transition">
              Cart 
              <span className="ml-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
              
            </Link>
          )}

          {/* ================= USER NOT LOGGED IN ================= */}
          {!user && !isAdminPage && (
            <>
              <Link to="/login" className="hover:text-red-600">
                Login
              </Link>
              <Link to="/signup" className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 transition">
                Signup
              </Link>
            </>
          )}

          {/* ================= USER LOGGED IN ================= */}
          {user && !isAdmin && (
            <>
              <Link to="/my-orders" className="hover:text-red-600">
                My Orders
              </Link>
              <button
                onClick={userLogout}
                className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}

          {/* ================= ADMIN NOT LOGGED IN ================= */}
          {!user && !isAdminPage && (
            <Link
              to="/admin/login"
              className="border border-gray-800 px-3 py-1.5 rounded hover:bg-black hover:text-white transition"
            >
              Admin
            </Link>
          )}

          {/* ================= ADMIN LOGGED IN ================= */}
          {isAdmin && (
            <>
              {!isAdminPage && (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-red-600"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={adminLogout}
                className="text-gray-600 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
