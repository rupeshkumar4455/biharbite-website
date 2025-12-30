import { BrowserRouter, Routes, Route } from "react-router-dom";

/* CONTEXT PROVIDERS */
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PAGES */
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <CartProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </AdminAuthProvider>
    </CartProvider>
  );
}
