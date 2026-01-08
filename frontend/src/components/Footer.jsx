import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
          <img src="/images/logo.png" alt="BiharBite Logo" className="h-8 w-10 inline-block mr-2"/>
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


        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-red-500">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-red-500">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-red-500">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/shipping" className="hover:text-red-500">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-red-500">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-red-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-red-500">
                Terms & Conditions
              </Link>
            </li>
            <li>
  <Link to="/contact" className="hover:text-red-500">
    Contact Us
  </Link>
</li>

          </ul>
        </div>

        {/* DELIVERY PARTNER */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Delivery Partner
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/rider/login"
                className="hover:text-red-500 font-medium"
              >
                Rider Login
              </Link>
            </li>
            <li className="text-gray-400 text-xs">
              Dedicated portal for BiharBite riders
            </li>
          </ul>
        </div>
      </div>


          
      


      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BiharBite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
