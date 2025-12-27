import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div>
        <h3>🍬 BiharBite</h3>
        <p>Authentic Bihari sweets made with love and purity.</p>
      </div>
      <div>
        <h4>Contact</h4>
        <p>Email: support@biharbite.com</p>
        <p>Phone: +91 6268947041</p>
      </div>
      <div>
        <h4>Follow Us</h4>
        <p>Instagram</p>
        <p>Facebook</p>
        <p>WhatsApp</p>
      </div>
    </div>
    <p className="footer-bottom">© {new Date().getFullYear()} BiharBite. All rights reserved.</p>
  </footer>
);

export default Footer;
