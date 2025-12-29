import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <header className="navbar">
      {/* LEFT: BRAND */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        BiharBite
      </div>

      {/* RIGHT: LINKS */}
      <nav className="navbar-right">
        <span onClick={() => navigate("/")}>Home</span>

        <span onClick={() => scrollToSection("about")}>
          About
        </span>

        <span onClick={() => scrollToSection("products")}>
          Products
        </span>

        <Link to="/cart">
          Cart{cart.length > 0 ? ` (${cart.length})` : ""}
        </Link>

        <Link to="/admin/login" className="admin-btn">
          Admin
        </Link>
      </nav>
    </header>
  );
}
