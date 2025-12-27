import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <h1>🍬 BiharBite</h1>
        <p>Authentic Bihari sweets — handmade, pure, and crafted with love.</p>
        <a
          href="https://wa.me/916268947041?text=Hello BiharBite!"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn"
        >
          Order Now
        </a>
      </section>


      

      {/* ABOUT SECTION */}
      <section className="about">
        <h2>About BiharBite</h2>
        <p>
          BiharBite brings the rich heritage of Bihar to your doorstep. Our sweets are handmade with traditional recipes,
          ensuring purity, taste, and the authentic Bihari flavor.
        </p>
      </section>

      {/* PRODUCTS SECTION */}
      <div className="container">
        <h2 className="section-title">BiharBite Specials</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US SECTION (MOVED AFTER PRODUCTS) */}
      <section className="why-choose">
        <h2>Why Choose BiharBite?</h2>
        <div className="reasons">
          <div className="reason-card">
            <h3>Traditional Recipes</h3>
            <p>Authentic flavors passed down through generations.</p>
          </div>
          <div className="reason-card">
            <h3>100% Handmade</h3>
            <p>Each sweet crafted with care and love.</p>
          </div>
          <div className="reason-card">
            <h3>Pure & Hygienic</h3>
            <p>Made under strict hygiene standards for your safety.</p>
          </div>
          <div className="reason-card">
            <h3>Fast Delivery</h3>
            <p>Get your sweets delivered fresh and on time.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
