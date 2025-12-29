import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

export default function Layout({ children }) {
  const { toast } = useCart();

  return (
    <div className="page-container">
      <Navbar />
      <Toast message={toast} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
