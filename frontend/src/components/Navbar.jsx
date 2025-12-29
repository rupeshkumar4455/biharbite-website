import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <header className="navbar">
      <div className="nav-left">
        <span className="logo">🍬</span>
        <span className="brand">BiharBite</span>
      </div>

      {/* RIGHT SIDE MENU */}
      <nav className="nav-right-menu">
        <Link to="/">Home</Link>
        <Link to="/#about">About</Link>
        <Link to="/#products">Products</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart ({cart.length})
        </Link>
        <Link to="/admin" className="admin-btn">
          Admin
        </Link>
      </nav>
    </header>
  );
}
