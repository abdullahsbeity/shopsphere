import { Link } from "react-router-dom";

const BACKEND_URL = "http://127.0.0.1:8000";

function getProductImage(product) {
  if (!product) return null;

  if (product.image_url && product.image_url.startsWith("http")) {
    return product.image_url;
  }

  if (product.image && product.image.startsWith("http")) {
    return product.image;
  }

  if (product.image) {
    return `${BACKEND_URL}/storage/${product.image}`;
  }

  return null;
}

export default function ProductCard({ product }) {
  const imageSrc = getProductImage(product);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("guest_cart")) || [];

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: imageSrc,
        quantity: 1,
      });
    }

    localStorage.setItem("guest_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Product added to cart");
  };

  return (
    <div className="group bg-[#0b1220] rounded-[2rem] border border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <div className="h-56 bg-[#111827] overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              onError={(e) => {
                console.log("Broken image URL:", e.currentTarget.src);
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 space-y-3">
        <div>
          <p className="text-sm text-sky-400">
            {product.category?.name || "Uncategorized"}
          </p>

          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-black mt-1 text-white hover:text-sky-400 transition">
              {product.name}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2">
          {product.description || "Premium quality product for everyday use."}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-slate-500">Price</p>
            <p className="text-xl font-black text-white">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <button
            onClick={addToCart}
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:from-sky-400 hover:to-blue-500 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}