import { createContext, useContext, useEffect, useState } from "react";

/* ===============================
   CONTEXT
   =============================== */
export const CartContext = createContext(null);

/* ===============================
   HOOK
   =============================== */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};

/* ===============================
   PROVIDER
   =============================== */
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  /* ===============================
     SYNC WITH LOCAL STORAGE
     =============================== */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ===============================
     ADD TO CART
     =============================== */
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find(
        (item) => item._id === product._id
      );

      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  /* ===============================
     INCREASE QTY
     =============================== */
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  /* ===============================
     DECREASE QTY
     (auto remove if qty becomes 0)
     =============================== */
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  /* ===============================
     REMOVE ITEM
     =============================== */
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  /* ===============================
     CLEAR CART
     =============================== */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,              // ✅ cart array
        addToCart,         // ✅ add item
        increaseQty,       // ✅ +
        decreaseQty,       // ✅ -
        removeFromCart,    // ✅ remove
        clearCart,         // ✅ clear all
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
