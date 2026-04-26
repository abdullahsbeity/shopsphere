import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

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

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);

        api
          .get("/products")
          .then((productsRes) => {
            const allProducts = productsRes.data.data ?? productsRes.data;

            const similar = allProducts
              .filter(
                (item) =>
                  item.id !== res.data.id &&
                  item.category_id === res.data.category_id
              )
              .slice(0, 4);

            setSimilarProducts(similar);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("guest_cart")) || [];

    const existingItem = cart.find((item) => item.id === product.id);

    const imageSrc = getProductImage(product);

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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  const imageSrc = getProductImage(product);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/products" className="text-sm text-gray-500 hover:text-black">
          ← Back to products
        </Link>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-[520px] bg-gray-100">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("Broken image URL:", e.currentTarget.src);
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <p className="text-sm text-gray-500">
              {product.category?.name || "Uncategorized"}
            </p>

            <h1 className="text-4xl font-extrabold mt-3">{product.name}</h1>

            <p className="text-3xl font-bold mt-6">
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm text-gray-500">Stock:</span>
              <span className="font-semibold">{product.stock}</span>
            </div>

            <button
              onClick={addToCart}
              className="mt-8 w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                You may also like
              </p>

              <h2 className="text-3xl font-extrabold mt-2">
                Similar Products
              </h2>
            </div>

            <Link
              to="/products"
              className="hidden md:inline-flex text-sm font-semibold text-gray-500 hover:text-black"
            >
              View all products →
            </Link>
          </div>

          {similarProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm">
              <p className="text-gray-500">
                No similar products available yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}