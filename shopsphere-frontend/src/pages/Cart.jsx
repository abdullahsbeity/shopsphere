import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    setCart(JSON.parse(localStorage.getItem("guest_cart")) || []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );

    setCart(updatedCart);
    localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Shopping Cart
          </p>
          <h1 className="text-4xl font-extrabold mt-2">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm">
            <p className="text-gray-500 mb-6">Your cart is empty.</p>
            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-full"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center border-b border-gray-100 py-5 last:border-b-0"
                >
                  <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <input
                    type="number"
                    min="1"
                    className="w-20 border border-gray-200 rounded-xl px-3 py-2"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                  />

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-fit">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}