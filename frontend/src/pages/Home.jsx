import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { API_BASE } from "../utils/api";

const banners = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="fade-in">
      {/* 🎯 Banner */}
      <section>
        <img
          src={banners[currentBanner]}
          className="w-full h-[420px] object-cover"
        />
      </section>

      {/* 🛍 Products */}
      <section className="section max-w-7xl mx-auto">
        <h2 className="text-3xl text-center mb-10">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p._id} className="card">
              <img
                src={p.image}
                className="h-52 w-full object-cover rounded-t-xl"
                onError={(e) =>
                  (e.target.src = "/images/placeholder.jpg")
                }
              />
              <div className="p-4">
                <h3 className="text-lg mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {p.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    ₹{p.price}
                  </span>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      addToCart({
                        id: p._id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                      })
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 Why Choose */}
      <section className="bg-gray-50 section">
        <h2 className="text-2xl text-center mb-8">
          Why Choose BiharBite?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>Authentic Bihari Taste</div>
          <div>Fresh & Hygienic</div>
          <div>Trusted Delivery</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
