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

          {/* 📖 ABOUT BIHARBITE */}
      <section className="bg-white section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl mb-4">
            About BiharBite
          </h2>
          <p className="text-gray-600 leading-relaxed">
            BiharBite is a humble initiative to bring the
            authentic taste of Bihar to your doorstep.
            We specialize in traditional sweets like
            <b> Anarsa, Khaja, Tilkut</b> and carefully
            curated combo packs, prepared using age-old
            recipes, pure ingredients, and hygienic
            processes.
          </p>
          <p className="text-gray-600 mt-3">
            Our mission is simple — preserve Bihar’s
            culinary heritage and deliver it with the
            quality and professionalism of modern
            e-commerce platforms.
          </p>
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
