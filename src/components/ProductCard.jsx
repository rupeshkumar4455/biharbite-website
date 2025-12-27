import React from "react";

const ProductCard = ({ product }) => {
  const handleOrder = () => {
    const message = `Hi BiharBite! I want to order "${product.name}" for ₹${product.price}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={handleOrder}>Order Now</button>
    </div>
  );
};

export default ProductCard;
