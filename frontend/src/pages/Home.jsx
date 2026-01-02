import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { API_BASE } from "../utils/api";

const banners = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

const testimonials = [
  {
    name: "Anmol Yadav",
    text: "Anarsa ka taste bilkul gaon jaisa tha. Loved BiharBite!",
  },
  {
    name: "Himanshu",
    text: "Khaja fresh aur crisp tha. Packing bhi kaafi acchi thi.",
  },
  {
    name: "Rishab",
    text: "Tilkut combo best tha. Definitely ordering again.",
  },
];

const Home = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 🔧 Fix React hydration (Vercel production)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔁 Banner auto-rotate
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [mounted]);

  // 📦 Fetch products
  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) =>
        setProducts(Array.isArray(data) ? data : [])
      )
      .catch(() => setProducts([]));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fade-in">
      {/* ================= HERO BANNER ================= */}
      <section>
        <img
          src={banners[currentBanner]}
          alt="BiharBite Banner"
          className="w-full h-[420px] object-cover"
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="section max-w-7xl mx-auto">
        <h2 className="text-3xl text-center mb-10">
          Our Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            Products not available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p._id} className="card">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-52 w-full object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.src =
                      "/images/placeholder.jpg";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg mb-1">
                    {p.name}
                  </h3>
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
        )}
      </section>

      {/* ================= ABOUT BIHARBITE ================= */}
      <section className="bg-white section">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl mb-4">
            About BiharBite
          </h2>
          <p className="text-gray-600 leading-relaxed">
            BiharBite is an initiative to bring authentic
            Bihari sweets like <b>Anarsa, Khaja, Tilkut</b>
            and curated combo packs to your doorstep using
            traditional recipes and modern quality
            standards.
          </p>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="bg-gray-50 section">
        <h2 className="text-2xl text-center mb-8">
          Why Choose BiharBite?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="card p-6">
            Authentic Taste
          </div>
          <div className="card p-6">
            Fresh & Hygienic
          </div>
          <div className="card p-6">
            Trusted Delivery
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section bg-white">
        <h2 className="text-2xl text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-6">
              <p className="text-sm text-gray-600 mb-3">
                “{t.text}”
              </p>
              <h4 className="font-semibold">
                – {t.name}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
