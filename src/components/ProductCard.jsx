import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [zoom, setZoom] = useState(false);

  return (
    <>
      <div className="product-card" onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}>
        <img src={product.image} alt={product.name} className={zoom ? "zoom" : ""} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <a href="https://wa.me/916268947041?text=Hello BiharBite!" target="_blank" rel="noopener noreferrer" className="order-btn">
          Order Now
        </a>
      </div>
    </>
  );
};

export default ProductCard;
