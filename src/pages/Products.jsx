import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Our BiharBite Specials</h1>
        <p>Handmade sweets crafted with tradition & love</p>
      </section>

      <div className="container">
        <h2 className="section-title">All Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
