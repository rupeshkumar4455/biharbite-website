import Navbar from "../components/Navbar";
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
    </>
  );
};

export default Home;
