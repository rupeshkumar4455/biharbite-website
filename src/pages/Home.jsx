import Navbar from "../components/Navbar";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Authentic Bihari Sweets</h1>
        <p>
          BiharBite brings you the real taste of Bihar — handmade, traditional
          and pure.
        </p>
      </section>

      {/* PRODUCTS */}
      <div className="container">
        <h2 className="section-title">BiharBite Specials</h2>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
