import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shipping_name: "",
    shipping_email: "",
    shipping_phone: "",
    shipping_address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const syncGuestCartToDatabase = async () => {
    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

    for (const item of guestCart) {
      await api.post("/cart", {
        product_id: item.id,
        quantity: item.quantity,
      });
    }
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await syncGuestCartToDatabase();

      await api.post("/orders", form);

      localStorage.removeItem("guest_cart");

      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Checkout
          </p>
          <h1 className="text-4xl font-extrabold mt-2">Shipping Details</h1>
          <p className="text-gray-500 mt-3">
            Enter your shipping information to place your order.
          </p>
        </div>

        <form
          onSubmit={submitOrder}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-50 text-red-600 rounded-2xl p-4 text-sm">
              {error}
            </div>
          )}

          <input
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            placeholder="Full name"
            value={form.shipping_name}
            onChange={(e) =>
              setForm({ ...form, shipping_name: e.target.value })
            }
            required
          />

          <input
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            type="email"
            placeholder="Email address"
            value={form.shipping_email}
            onChange={(e) =>
              setForm({ ...form, shipping_email: e.target.value })
            }
            required
          />

          <input
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            placeholder="Phone number"
            value={form.shipping_phone}
            onChange={(e) =>
              setForm({ ...form, shipping_phone: e.target.value })
            }
          />

          <textarea
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black min-h-32"
            placeholder="Shipping address"
            value={form.shipping_address}
            onChange={(e) =>
              setForm({ ...form, shipping_address: e.target.value })
            }
            required
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>
      </section>
    </div>
  );
}