import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyForm = {
  category_id: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  image: null,
  is_active: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [productTotal, setProductTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const productsRes = await api.get("/admin/products");
    const categoriesRes = await api.get("/categories");

    setProducts(productsRes.data.data ?? productsRes.data);
    setProductTotal(productsRes.data.total ?? productsRes.data.length);
    setCategories(categoriesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingProduct(null);

    const fileInput = document.getElementById("product-image");
    if (fileInput) fileInput.value = "";
  };

  const startEdit = (product) => {
    setEditingProduct(product);

    setForm({
      category_id: product.category_id || "",
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      image: null,
      is_active: Boolean(product.is_active),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      payload.append("category_id", form.category_id);
      payload.append("name", form.name);
      payload.append("description", form.description || "");
      payload.append("price", form.price);
      payload.append("stock", form.stock);
      payload.append("is_active", form.is_active ? "1" : "0");

      if (form.image) {
        payload.append("image", form.image);
      }

      if (editingProduct) {
        payload.append("_method", "PUT");

        await api.post(`/admin/products/${editingProduct.id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/admin/products", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      fetchData();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          (editingProduct
            ? "Failed to update product."
            : "Failed to create product.")
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    await api.delete(`/admin/products/${id}`);
    fetchData();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Admin Panel
          </p>

          <h1 className="text-4xl font-extrabold mt-2">
            {editingProduct ? "Edit Product" : "Manage Products"}
          </h1>

          <p className="text-gray-500 mt-3">
            Create, update, upload images, and manage your store catalog.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {editingProduct && (
            <div className="md:col-span-3 bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Editing: {editingProduct.name}</p>
                <p className="text-sm text-gray-500">
                  Leave image empty if you do not want to replace it.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold hover:border-black transition"
              >
                Cancel Edit
              </button>
            </div>
          )}

          <select
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />

          <input
            id="product-image"
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />

          <label className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
            />
            <span className="text-sm text-gray-600">Active product</span>
          </label>

          <textarea
            className="md:col-span-3 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black min-h-28"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            disabled={loading}
            className={`md:col-span-3 rounded-2xl py-3 font-semibold transition disabled:opacity-50 ${
              editingProduct
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading
              ? editingProduct
                ? "Updating product..."
                : "Creating product..."
              : editingProduct
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold">Products</h2>

            <span className="text-sm text-gray-500">
              {productTotal} products
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-100">
                    <td className="px-6 py-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden">
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-semibold">{product.name}</td>

                    <td className="px-6 py-4 text-gray-500">
                      {product.category?.name}
                    </td>

                    <td className="px-6 py-4">
                      ${Number(product.price).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">{product.stock}</td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button
                          onClick={() => startEdit(product)}
                          className="text-black text-sm font-semibold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}