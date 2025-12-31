import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const banners = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

const products = [
  {
    id: 1,
    name: "Anarsa",
    price: 299,
    image: "/images/anarsa.jpg",
  },
  {
    id: 2,
    name: "Khaja",
    price: 349,
    image: "/images/khaja.jpg",
  },
  {
    id: 3,
    name: "Tikut",
    price: 249,
    image: "/images/tilkut.jpg",
  },
  {
    id: 4,
    name: "Combo Pack",
    price: 799,
    image: "/images/combo.jpg",
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const [current, setCurrent] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* ================= HERO SLIDER ================= */}
      <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
        {banners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-gray-600 mb-3">
                  ₹{p.price}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="w-full bg-black text-white py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold mb-4">
            About BiharBite
          </h2>
          <p className="text-gray-600 leading-relaxed">
            BiharBite brings authentic Bihari sweets like
            Anarsa, Khaja and Tikut using traditional
            recipes and quality ingredients.
          </p>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold mb-2">
              Authentic Taste
            </h3>
            <p className="text-gray-600 text-sm">
              Traditional Bihar recipes
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              Fresh & Hygienic
            </h3>
            <p className="text-gray-600 text-sm">
              Packed with care
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              Trusted Brand
            </h3>
            <p className="text-gray-600 text-sm">
              Loved by customers
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold mb-6">
            What Our Customers Say
          </h2>
          <p className="italic text-gray-700">
            “Bilkul ghar jaisa swad! Packaging bhi top-class.”
          </p>
          <p className="mt-2 font-medium">
            — Happy Customer
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
