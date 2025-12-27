import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">🍬 BiharBite</h1>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#why-choose">Why Choose Us</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
