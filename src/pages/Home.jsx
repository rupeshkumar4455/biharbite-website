import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import Testimonials from "../components/Testimonials";

const Home = () => (
  <>
    <Navbar />

    <section className="hero" id="home">
      <h1>🍬 BiharBite</h1>
      <p>Authentic Bihari sweets — handmade, pure & crafted with love.</p>
      <a href="https://wa.me/916268947041?text=Hello BiharBite!" target="_blank" rel="noopener noreferrer" className="hero-btn">
        Order Now
      </a>
    </section>

    <section className="about">
      <h2>About BiharBite</h2>
      <p>BiharBite brings the rich heritage of Bihar to your doorstep with handmade sweets using traditional recipes.</p>
    </section>

    <div className="container" id="products">
      <h2 className="section-title">BiharBite Specials</h2>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>

    <section className="why-choose" id="why-choose">
      <h2>Why Choose BiharBite?</h2>
      <div className="reasons">
        <div className="reason-card"><h3>Traditional Recipes</h3><p>Authentic flavors passed down generations.</p></div>
        <div className="reason-card"><h3>100% Handmade</h3><p>Crafted with care and love.</p></div>
        <div className="reason-card"><h3>Pure & Hygienic</h3><p>Made under strict hygiene standards.</p></div>
        <div className="reason-card"><h3>Fast Delivery</h3><p>Get your sweets fresh & on time.</p></div>
      </div>
    </section>

    <Testimonials />

    <Footer />
  </>
);

export default Home;
