import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ================= ABOUT ================= */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            BiharBite
          </h3>
          <p className="text-sm text-gray-300">
            BiharBite brings authentic Bihari sweets like
            Anarsa, Khaja and Tilkut directly to your home
            with quality, hygiene and trust.
          </p>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/my-orders">My Orders</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {/* ================= SUPPORT ================= */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/refund">Return & Refund</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li>
              <a href="mailto:support@biharbite.com">
                support@biharbite.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-700">
        © {new Date().getFullYear()} BiharBite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
