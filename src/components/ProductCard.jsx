const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <a
        href={`https://wa.me/916268947041?text=I want to order ${product.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="order-btn"
      >
        Order via WhatsApp
      </a>
    </div>
  );
};

export default ProductCard;
