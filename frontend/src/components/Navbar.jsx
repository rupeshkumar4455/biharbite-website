import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();

  // 👇 now this will NEVER be undefined
  const { cartItems } = useCart();

  return (
    <header className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        BiharBite
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#products">Products</a></li>

        <li>
          <Link to="/cart">
            Cart{cartItems.length > 0 && ` (${cartItems.length})`}
          </Link>
        </li>

        <li>
          <Link className="admin-btn" to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </header>
  );
}
