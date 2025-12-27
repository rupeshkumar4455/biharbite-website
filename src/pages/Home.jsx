import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="hero" className="hero">
        <h1>🍬 BiharBite</h1>
        <p>Authentic Bihari sweets, crafted with love and tradition.</p>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <h2 className="section-title">About BiharBite</h2>
        <p>BiharBite brings the rich heritage of Bihar's sweets to your doorstep. Handmade, pure, and timeless delights for every occasion.</p>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products">
        <h2 className="section-title">BiharBite Specials</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why" className="why-biharbite">
        <h2 className="section-title">Why Choose BiharBite?</h2>
        <p>✔️ Pure & Handmade</p>
        <p>✔️ Rich Traditional Flavors</p>
        <p>✔️ Fresh & Timely Delivery</p>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>“BiharBite sweets are amazing! Loved the taste.”</p>
            <h4>- Priya S.</h4>
          </div>
          <div className="testimonial-card">
            <p>“Authentic flavor, fast delivery. Highly recommend!”</p>
            <h4>- Raj K.</h4>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
