import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useAdminAuth } from "../context/AdminAuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { isAdmin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  // 🔐 ADMIN VIEW (MINIMAL NAVBAR)
  if (isAdmin) {
    return (
      <nav className="bg-black text-white px-6 py-4 flex justify-between">
        <span className="font-bold text-lg">BiharBite Admin</span>
        <button
          onClick={() => {
            logoutAdmin();
            navigate("/");
          }}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>
    );
  }

  // 👤 USER NAVBAR
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <Link to="/" className="text-2xl font-bold text-red-600">
        BiharBite
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/my-orders">My Orders</Link>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <Link to="/admin/login" className="border px-3 py-1 rounded">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
