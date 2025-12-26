const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <div className="price">{product.price}</div>
      <a
  className="whatsapp-btn"
  href={`https://wa.me/916268947041?text=Hello BiharBite! I want to order ${product.name} (${product.price})`}
  target="_blank"
>
  Order on WhatsApp
</a>
    </div>
  );
};

export default ProductCard;
