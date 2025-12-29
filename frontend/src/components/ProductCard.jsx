import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const whatsappLink = `https://wa.me/91XXXXXXXXXX?text=I want to order ${product.name} for ₹${product.price}`;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>

      <div className="actions">
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <a href={whatsappLink} target="_blank">Order</a>
      </div>
    </div>
  );
}
