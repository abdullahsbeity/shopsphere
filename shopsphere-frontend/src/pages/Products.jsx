import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    min_price: "",
    max_price: "",
    sort: "newest",
    page: 1,
  });

  const fetchProducts = async () => {
    const res = await api.get("/products", { params: filters });
    setProducts(res.data.data);
    setMeta(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters.page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
    setTimeout(fetchProducts, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Shop
          </p>
          <h1 className="text-4xl font-extrabold mt-2">Explore Products</h1>
          <p className="text-gray-500 mt-3">
            Search, filter, and discover products from the catalog.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 shadow-sm rounded-3xl p-5 grid grid-cols-1 md:grid-cols-6 gap-3 mb-8"
        >
          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            type="number"
            placeholder="Min price"
            value={filters.min_price}
            onChange={(e) =>
              setFilters({ ...filters, min_price: e.target.value })
            }
          />

          <input
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            type="number"
            placeholder="Max price"
            value={filters.max_price}
            onChange={(e) =>
              setFilters({ ...filters, max_price: e.target.value })
            }
          />

          <select
            className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price low</option>
            <option value="price_high">Price high</option>
          </select>

          <button className="bg-black text-white rounded-2xl px-4 py-3 hover:bg-gray-800 transition">
            Filter
          </button>
        </form>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-100">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}

        {meta && meta.last_page > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={meta.current_page === 1}
              onClick={() =>
                setFilters({ ...filters, page: meta.current_page - 1 })
              }
              className="px-5 py-2 rounded-full border border-gray-200 disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {meta.current_page} of {meta.last_page}
            </span>

            <button
              disabled={meta.current_page === meta.last_page}
              onClick={() =>
                setFilters({ ...filters, page: meta.current_page + 1 })
              }
              className="px-5 py-2 rounded-full border border-gray-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
    
  );
    <footer className="bg-[#020617] text-white border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black">
                    S
                  </div>
                  <span className="text-2xl font-black">ShopSphere Tech</span>
                </Link>
  
                <p className="text-slate-400 mt-5 max-w-md leading-relaxed">
                  A modern tech store for discovering gadgets, accessories,
                  special offers, and a smooth shopping experience from cart to
                  checkout.
                </p>
  
                <div className="mt-6 flex gap-3">
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-slate-300">
                    f
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-slate-300">
                    x
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-slate-300">
                    in
                  </span>
                </div>
              </div>
  
              <div>
                <h3 className="font-black text-lg">Shop</h3>
  
                <div className="mt-5 space-y-3">
                  <Link
                    to="/products"
                    className="block text-slate-400 hover:text-white transition"
                  >
                    All Products
                  </Link>
  
                  <Link
                    to="/cart"
                    className="block text-slate-400 hover:text-white transition"
                  >
                    Cart
                  </Link>
  
                  <Link
                    to="/orders"
                    className="block text-slate-400 hover:text-white transition"
                  >
                    My Orders
                  </Link>
                </div>
              </div>
  
              <div>
                <h3 className="font-black text-lg">Account</h3>
  
                <div className="mt-5 space-y-3">
                  <Link
                    to="/login"
                    className="block text-slate-400 hover:text-white transition"
                  >
                    Login
                  </Link>
  
                  <Link
                    to="/register"
                    className="block text-slate-400 hover:text-white transition"
                  >
                    Create Account
                  </Link>
  
                  <Link
                    to="/products"
                    className="block text-slate-400 hover:text-white transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            </div>
  
            <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">
              <p>
                © {new Date().getFullYear()} ShopSphere Tech. All rights
                reserved.
              </p>
              <p>Built for a smooth and modern tech shopping experience.</p>
            </div>
          </div>
        </footer>
}