import { useEffect, useState } from "react";
import { API_BASE } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const fetchProducts = async () => {
    const res = await fetch(`${API_BASE}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await fetch(`${API_BASE}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(form),
    });
    setForm({ name: "", price: "", image: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`${API_BASE}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Admin Product Management
      </h2>

      {/* ADD PRODUCT */}
      <div className="border p-4 mb-6">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={addProduct}
          className="bg-black text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      {/* PRODUCT LIST */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
