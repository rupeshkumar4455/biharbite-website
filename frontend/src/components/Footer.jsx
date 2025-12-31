import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* TOP SECTION */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Bihar<span className="text-accent">Bite</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed">
            BiharBite brings authentic Bihari food products directly to your
            doorstep with quality, purity, and trust.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
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

        {/* SUPPORT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              Shipping Policy
            </li>
            <li className="hover:text-white cursor-pointer">
              Return & Refund
            </li>
            <li className="hover:text-white cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Bihar, India</li>
            <li>📞 +91 XXXXX XXXXX</li>
            <li>✉️ support@biharbite.com</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} BiharBite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
