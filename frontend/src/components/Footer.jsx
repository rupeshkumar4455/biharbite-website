import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-col">
          <h3>BiharBite</h3>
          <p>
            Authentic Bihari sweets delivered fresh to your home.
            Made with love, tradition & purity.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#products">Products</a></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>Customer Support</h4>
          <ul>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>📍 Bihar, India</p>
          <p>📞 +91 6268947041</p>
          <p>✉️ support@biharbite.com</p>

          <div className="socials">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>WhatsApp</span>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} BiharBite. All Rights Reserved.
      </div>
    </footer>
  );
}
