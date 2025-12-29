import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { addToCart } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <>
      {/* ================= HERO BANNER ================= */}
      <section className="hero">
        <div className="hero-text">
          <h1 className={show ? "hero-title show" : "hero-title"}>
            BiharBite
          </h1>
          <p className={show ? "hero-sub show" : "hero-sub"}>
            Authentic Bihari Sweets • Handmade • Pure Taste
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about" id="about">
        <h2>About BiharBite</h2>
        <p>
          BiharBite brings the authentic taste of Bihar’s traditional sweets
          directly to your home. Every product is handmade with love, purity,
          and traditional recipes passed down generations.
        </p>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="products" id="products">
        <h2>BiharBite Specials</h2>

        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <button onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="why">
        <h2>Why Choose BiharBite?</h2>
        <ul>
          <li>✔ 100% Pure Ingredients</li>
          <li>✔ Traditional Bihari Recipes</li>
          <li>✔ Fresh & Hygienic Preparation</li>
          <li>✔ Trusted by Customers Across India</li>
        </ul>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials">
        <h2>What People Say</h2>

        <div className="testimonial">
          “Exactly like home-made sweets from Bihar. Loved the taste!”
        </div>

        <div className="testimonial">
          “Best quality sweets I’ve ordered online. Highly recommended.”
        </div>
      </section>
    </>
  );
}
