import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* ================= BRAND ================= */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Bihar<span className="text-red-500">Bite</span>
          </h2>
          <p className="text-sm leading-relaxed">
            BiharBite brings authentic Bihari sweets like Anarsa, Khaja
            and Tilkut directly from Bihar to your doorstep.
            <br />
            <span className="text-gray-400">
              Taste the tradition, feel the culture.
            </span>
          </p>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-white">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= SUPPORT ================= */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/shipping" className="hover:text-white">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-white">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              📍 Bihar, India
            </li>
            <li>
              📧 support@biharbite.com
            </li>
            <li>
              📞 +91 6268947041
            </li>
            <li className="text-gray-400">
              Mon – Sat (10 AM – 7 PM)
            </li>
          </ul>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">
          BiharBite
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
