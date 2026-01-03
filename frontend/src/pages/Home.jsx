import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { API_BASE } from "../utils/api";

/* banner images – already present in public/images */
const banners = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

const Home = () => {
  const { addToCart } = useCart() || {};

  const [products, setProducts] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  /* rotate banner */
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* fetch products */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* ================= BANNER ================= */}
      <div className="w-full h-[420px] overflow-hidden">
        <img
          src={banners[bannerIndex]}
          alt="BiharBite Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-44 w-full object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {p.description}
              </p>

              <p className="font-bold mb-3">₹{p.price}</p>

              <button
                className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
                onClick={() =>
                  addToCart &&
                  addToCart({
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-gray-100 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            About BiharBite
          </h2>
          <p className="text-gray-700 leading-relaxed">
            BiharBite brings you authentic Bihari sweets like
            Anarsa, Khaja and Tilkut — prepared using traditional
            recipes and delivered fresh to your home with
            hygiene, purity and love.
          </p>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose BiharBite
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Authentic Taste
              </h3>
              <p className="text-gray-600">
                Traditional Bihari recipes passed through
                generations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Fresh & Hygienic
              </h3>
              <p className="text-gray-600">
                Prepared fresh with quality ingredients.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Trusted Delivery
              </h3>
              <p className="text-gray-600">
                Safe packaging and timely doorstep delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-gray-100 py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <p className="text-gray-600">
                “Exactly like homemade sweets from Bihar.
                Loved the Anarsa!”
              </p>
              <p className="mt-3 font-semibold">– Anmol</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <p className="text-gray-600">
                “Best Tilkut I’ve had outside Bihar.”
              </p>
              <p className="mt-3 font-semibold">– Rishab</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <p className="text-gray-600">
                “Packaging and taste both are top-notch.”
              </p>
              <p className="mt-3 font-semibold">– Himanshu</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
