import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

/* 🔐 PROTECTED ADMIN ROUTE */
function AdminRoute({ children }) {
  const { isAdmin } = useAdminAuth();
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <CartProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />

            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />

            <Route
              path="/checkout"
              element={
                <Layout>
                  <Checkout />
                </Layout>
              }
            />

            {/* 🔑 ADMIN ROUTES */}
            <Route
              path="/admin"
              element={<Navigate to="/admin/login" replace />}
            />

            <Route
              path="/admin/login"
              element={
                <Layout>
                  <AdminLogin />
                </Layout>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </AdminRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </CartProvider>
  );
}
