import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart safely
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart"));
      if (Array.isArray(saved)) {
        setCart(saved);
      } else {
        localStorage.removeItem("cart");
      }
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  const addToCart = (product) => {
    const updated = [...cart, { ...product, qty: 1 }];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
