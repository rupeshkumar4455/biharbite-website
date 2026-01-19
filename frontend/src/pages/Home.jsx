import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { API_BASE } from "../utils/api";
import { motion } from "framer-motion";

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
  const [loading, setLoading] = useState(true);

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
  } finally {
    setLoading(false); // ✅ yahi magic hai
  }
};
    fetchProducts();
  }, []);

  return (
    <div>
      {/* ================= BANNER ================= */}
      <div className="relative w-full h-[420px] overflow-hidden">

  {/* IMAGE */}
  <motion.img
  src={banners[bannerIndex]}
  alt="Banner"
  initial={{ scale: 1.1 }}
  animate={{ scale: 1 }}
  transition={{ duration: 1 }}
  className="w-full h-full object-cover"
/>


  {/* LEFT ARROW */}
  <button
    onClick={() =>
      setBannerIndex(
        bannerIndex === 0 ? banners.length - 1 : bannerIndex - 1
      )
    }
    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black w-10 h-10 rounded-full text-2xl flex items-center justify-center shadow"
  >
    ‹
  </button>

  {/* RIGHT ARROW */}
  <button
    onClick={() =>
      setBannerIndex((bannerIndex + 1) % banners.length)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black w-10 h-10 rounded-full text-2xl flex items-center justify-center shadow"
  >
    ›
  </button>

  {/* DOTS */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    {banners.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setBannerIndex(idx)}
        className={`w-3 h-3 rounded-full transition ${
          bannerIndex === idx
            ? "bg-red-600"
            : "bg-white/70"
        }`}
      ></button>
    ))}
  </div>
</div>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-extrabold text-center mb-10">
    Our <span className="text-red-600">Products 🧁</span>
  </h2>

        <div className="max-w-7xl mx-auto px-6">
  {loading ? (
    /* 🔹 SKELETON LOADING */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-100 h-72 rounded-xl"
        />
      ))}
    </div>
  ) : (
    /* 🔹 REAL PRODUCTS */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((p) => (
        <motion.div
          key={p._id}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl shadow hover:shadow-xl transition"
        >
          <img
  src={p.image}
  alt={p.name}
  className="h-52 w-full object-cover rounded-lg"
  style={{ transform: "translateZ(60px)" }}
/>

          <div className="p-4">
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {p.description}
            </p>

            <p className="text-xl font-extrabold text-lightyellow-600 mt-2">
              ₹{p.price}
            </p>

            <button
  className="bg-green-600 text-white w-full py-2 rounded-lg mt-4"
  style={{
    boxShadow: "0 6px 0 #15803d",
  }}
  onMouseDown={(e) =>
    (e.currentTarget.style.transform = "translateY(4px)")
  }
  onMouseUp={(e) =>
    (e.currentTarget.style.transform = "translateY(0)")
  }
  onClick={() => addToCart({ ...p })}
>
  Add to Cart
</button>

            </div>
        </motion.div>
      ))}
    </div>
  )}
</div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-16 bg-gradient-to-b from-white to-red-50">
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

          {/* ===============================
   ABOUT FOUNDER (PRO VERSION)
   =============================== */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* FOUNDER IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <img
        src="/images/founder.jpg"
        alt="Founder of BiharBite"
        className="w-72 h-72 object-cover rounded-full shadow-lg border-4 border-white"
      />
    </motion.div>

    {/* FOUNDER CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-3 text-gray-900">
        Meet the Founder
      </h2>

      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xl font-semibold text-red-600">
          Rupesh Kumar
        </h3>

        {/* LINKEDIN ICON */}
        <a
          href="https://www.linkedin.com/in/rupesh-kumar-9a0ba528a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
          title="LinkedIn Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5v-7.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4v7.7h-5V8z" />
          </svg>
        </a>
      </div>




<p className="text-gray-700 leading-relaxed mb-4">
        I am a Computer Science Engineering graduate from
        <strong> NIT Bhopal (MANIT)</strong>. While technology is my
        academic background, my roots and culture have
        always been close to my heart.
      </p>

       <p className="text-gray-700 leading-relaxed mb-4">
        BiharBite was started with a simple vision —
        to bring the authentic taste of Bihar’s traditional
        sweets like <strong>Anarsa</strong>, <strong>Khaja</strong> and
        <strong> Tilkut</strong> to every household in India.
      </p>

       

      <p className="text-gray-700 leading-relaxed mb-4">
        BiharBite is my effort to preserve Bihar’s food
        heritage using modern technology, transparency
        and quality-driven processes.
      </p>

      <p className="italic text-gray-600">
        “By combining tradition with technology, BiharBite
        delivers authentic taste with trust.”
      </p>
    </motion.div>

  </div>
</section>


    </div>
  );
};

export default Home;
