import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminHeroImages() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    const res = await api.get("/admin/hero-images");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please choose an image.");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("image", image);
      payload.append("is_active", isActive ? "1" : "0");

      await api.post("/admin/hero-images", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImage(null);
      setIsActive(true);

      const fileInput = document.getElementById("hero-image");
      if (fileInput) fileInput.value = "";

      fetchImages();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (item) => {
    await api.put(`/admin/hero-images/${item.id}`, {
      is_active: !item.is_active,
    });

    fetchImages();
  };

  const deleteImage = async (id) => {
    if (!confirm("Delete this hero image?")) return;

    await api.delete(`/admin/hero-images/${id}`);
    fetchImages();
  };

  return (
    <div className="bg-[#f8f5ef] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">
            Admin Panel
          </p>

          <h1 className="text-4xl font-black mt-2">Hero Images</h1>

          <p className="text-slate-500 mt-3">
            Upload and manage homepage hero slider images.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-[2rem] border border-white shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <input
            id="hero-image"
            type="file"
            accept="image/*"
            className="md:col-span-2 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:border-slate-950"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-sm text-slate-600">Active image</span>
          </label>

          <button
            disabled={loading}
            className="md:col-span-3 bg-slate-950 text-white rounded-2xl py-3 font-bold hover:bg-slate-800 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Hero Image"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[2rem] border border-white shadow-sm overflow-hidden"
            >
              <div className="h-56 bg-slate-100">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.is_active ? "Active" : "Inactive"}
                  </span>

                  <span className="text-sm text-slate-400">#{item.id}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => toggleActive(item)}
                    className="flex-1 bg-slate-100 text-slate-950 rounded-full py-2 text-sm font-bold hover:bg-slate-200 transition"
                  >
                    {item.is_active ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() => deleteImage(item.id)}
                    className="flex-1 bg-red-50 text-red-600 rounded-full py-2 text-sm font-bold hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {images.length === 0 && (
            <div className="md:col-span-3 bg-white rounded-[2rem] border border-white p-10 text-center shadow-sm">
              <p className="text-slate-500">No hero images uploaded yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}