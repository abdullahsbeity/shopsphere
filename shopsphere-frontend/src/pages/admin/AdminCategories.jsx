import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const res = await api.get("/admin/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    setLoading(true);

    try {
      if (editingCategory) {
        await api.put(`/admin/categories/${editingCategory.id}`, {
          name,
        });
      } else {
        await api.post("/admin/categories", {
          name,
        });
      }

      setName("");
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setName("");
  };

  const deleteCategory = async (id) => {
    if (!confirm("Delete this category? Products inside it may also be affected.")) {
      return;
    }

    try {
      await api.delete(`/admin/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete category.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Admin Panel
          </p>

          <h1 className="text-4xl font-extrabold mt-2">Manage Categories</h1>

          <p className="text-gray-500 mt-3">
            Create, update, and organize product categories for your store.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row gap-4 mb-8"
        >
          <input
            className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            placeholder="Category name, e.g. Shoes"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingCategory
              ? "Update Category"
              : "Create Category"}
          </button>

          {editingCategory && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-100 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold">Categories</h2>
            <span className="text-sm text-gray-500">
              {categories.length} categories
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Products</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-t border-gray-100">
                    <td className="px-6 py-4 text-gray-500">#{category.id}</td>

                    <td className="px-6 py-4 font-semibold">
                      {category.name}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {category.slug}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {category.products_count ?? 0}
                    </td>

                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => startEdit(category)}
                        className="text-black text-sm font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No categories found.
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