import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Authentic Bihari Sweets</h1>
        <p>
          BiharBite brings you the real taste of Bihar — handmade, traditional
          and crafted with love.
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

      {/* ABOUT SECTION */}
      <section className="about">
        <h2>About BiharBite</h2>

        <p>
          BiharBite was born with a simple mission — to take Bihar’s authentic
          sweets from local kitchens to the entire country.
        </p>

        <p>
          From Gaya’s famous Tilkut to Silao’s crispy Khaja, every product is
          handmade by skilled artisans using traditional recipes passed down
          through generations.
        </p>

        <p>
          We believe in purity, quality ingredients, and zero preservatives —
          so every bite tastes just like home.
        </p>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <h2>Why Choose BiharBite?</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>100% Handmade</h3>
            <p>
              Every sweet is carefully handmade using traditional methods to
              preserve authentic taste.
            </p>
          </div>

          <div className="why-card">
            <h3>No Preservatives</h3>
            <p>
              We use natural ingredients only — no chemicals, no shortcuts,
              just purity.
            </p>
          </div>

          <div className="why-card">
            <h3>Authentic Recipes</h3>
            <p>
              Original recipes passed down through generations of Bihar’s
              kitchens.
            </p>
          </div>

          <div className="why-card">
            <h3>Local Artisans</h3>
            <p>
              Supporting skilled local sweet makers and traditional
              craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
