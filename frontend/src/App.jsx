import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONTEXTS
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// USER PAGES
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import Signup from "./pages/Signup";

// ADMIN
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Navbar />

            <main>
              <Routes>
                {/* USER */}
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/signup" element={<Signup />} />


                {/* ADMIN */}
                <Route path="/admin/login" element={<AdminLogin />} />
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
    </AuthProvider>
  );
}
