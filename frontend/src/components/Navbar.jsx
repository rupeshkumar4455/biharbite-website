import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        BiharBite
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="#products">Products</a></li>

        <li>
          <Link to="/cart">
            Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </Link>
        </li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

        {user && (
          <>
            <li><Link to="/my-orders">My Orders</Link></li>
            <li>
              <button
                className="link-btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}

        <li>
          <Link className="admin-btn" to="/admin/login">
            Admin
          </Link>
        </li>
      </ul>
    </header>
  );
}
