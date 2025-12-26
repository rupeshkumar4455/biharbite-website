import Navbar from "../components/Navbar";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <>
      <Navbar />

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
