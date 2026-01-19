import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>

          {/* 🌍 GLOBAL 3D EFFECT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: -12 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ perspective: 1200 }}
          >
            <App />
          </motion.div>

        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>
);
