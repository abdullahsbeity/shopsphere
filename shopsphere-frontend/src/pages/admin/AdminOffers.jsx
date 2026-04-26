import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyForm = {
  title: "",
  subtitle: "",
  button_text: "Shop Now",
  button_link: "/products",
  image: null,
  is_active: true,
};

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingOffer, setEditingOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOffers = async () => {
    const res = await api.get("/admin/offers");
    setOffers(res.data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingOffer(null);

    const fileInput = document.getElementById("offer-image");
    if (fileInput) fileInput.value = "";
  };

  const startEdit = (offer) => {
    setEditingOffer(offer);

    setForm({
      title: offer.title || "",
      subtitle: offer.subtitle || "",
      button_text: offer.button_text || "Shop Now",
      button_link: offer.button_link || "/products",
      image: null,
      is_active: Boolean(offer.is_active),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      payload.append("title", form.title);
      payload.append("subtitle", form.subtitle || "");
      payload.append("button_text", form.button_text || "Shop Now");
      payload.append("button_link", form.button_link || "/products");
      payload.append("is_active", form.is_active ? "1" : "0");

      if (form.image) {
        payload.append("image", form.image);
      }

      if (editingOffer) {
        await api.post(`/admin/offers/${editingOffer.id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/admin/offers", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      fetchOffers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save offer.");
    } finally {
      setLoading(false);
    }
  };

  const deleteOffer = async (id) => {
    if (!confirm("Delete this offer?")) return;

    await api.delete(`/admin/offers/${id}`);
    fetchOffers();
  };

  return (
    <div className="bg-[#f8f5ef] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">
            Admin Panel
          </p>
          <h1 className="text-4xl font-black mt-2">
            {editingOffer ? "Edit Offer" : "Manage Offers"}
          </h1>
          <p className="text-slate-500 mt-3">
            Create homepage offer cards and promotional banners from the admin panel.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-[2rem] border border-white shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {editingOffer && (
            <div className="md:col-span-2 bg-[#f8f5ef] rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-bold">Editing: {editingOffer.title}</p>
                <p className="text-sm text-slate-500">
                  Leave image empty if you do not want to replace it.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-bold hover:border-slate-950 transition"
              >
                Cancel Edit
              </button>
            </div>
          )}

          <input
            className="border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-slate-950"
            placeholder="Offer title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            className="border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-slate-950"
            placeholder="Button text"
            value={form.button_text}
            onChange={(e) => setForm({ ...form, button_text: e.target.value })}
          />

          <input
            className="border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-slate-950"
            placeholder="Button link, e.g. /products"
            value={form.button_link}
            onChange={(e) => setForm({ ...form, button_link: e.target.value })}
          />

          <input
            id="offer-image"
            className="border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-slate-950"
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />

          <textarea
            className="md:col-span-2 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-slate-950 min-h-28"
            placeholder="Offer subtitle / description"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />

          <label className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
            />
            <span className="text-sm text-slate-600">Active offer</span>
          </label>

          <button
            disabled={loading}
            className="bg-slate-950 text-white rounded-2xl py-3 font-bold hover:bg-slate-800 transition disabled:opacity-50"
          >
            {loading
              ? editingOffer
                ? "Updating offer..."
                : "Creating offer..."
              : editingOffer
              ? "Update Offer"
              : "Create Offer"}
          </button>
        </form>

        <div className="bg-white rounded-[2rem] border border-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-black">Offers</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Button</th>
                  <th className="px-6 py-4">Link</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden">
                        {offer.image_url && (
                          <img
                            src={offer.image_url}
                            alt={offer.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold">{offer.title}</p>
                      <p className="text-sm text-slate-500 line-clamp-1">
                        {offer.subtitle}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {offer.button_text}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {offer.button_link}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                        {offer.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button
                          onClick={() => startEdit(offer)}
                          className="text-slate-950 text-sm font-bold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteOffer(offer.id)}
                          className="text-red-600 text-sm font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {offers.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      No offers found.
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