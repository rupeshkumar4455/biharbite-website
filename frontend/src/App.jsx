import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";



import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

 

import Shipping from "./pages/Shipping";
import Refund from "./pages/Refund";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RiderLogin from "./pages/rider/RiderLogin";
import RiderDashboard from "./pages/rider/RiderDashboard";
import Contact from "./pages/Contact";



const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* ADMIN */}
        <Route path="/track/:id" element={<TrackOrder />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* FOOTER PAGES */}
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/rider/login" element={<RiderLogin />} />
        <Route path="/rider/dashboard" element={<RiderDashboard />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
    </>
  );
};

export default App;
