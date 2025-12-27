import React, { useState, useEffect } from "react";
import testimonials from "../data/testimonials";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { name, feedback } = testimonials[current];

  return (
    <section className="testimonials" id="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-card">
        <p>"{feedback}"</p>
        <h4>- {name}</h4>
      </div>
    </section>
  );
};

export default Testimonials;
