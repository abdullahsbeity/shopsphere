import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FloatingCart() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const updateCart = () => {
    const items = JSON.parse(localStorage.getItem("guest_cart")) || [];

    const totalCount = items.reduce((sum, item) => {
      return sum + Number(item.quantity || 0);
    }, 0);

    setCart(items);
    setCount(totalCount);
  };

  useEffect(() => {
    updateCart();

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    const totalCount = updatedCart.reduce((sum, item) => {
      return sum + Number(item.quantity || 0);
    }, 0);

    setCount(totalCount);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  if (count === 0) return null;

  return (
    <>
      {/* Floating Basket Button - Mobile Only */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center shadow-2xl"
      >
        <span className="text-2xl">🛒</span>

        <span className="absolute -top-1 -right-1 min-w-6 h-6 px-2 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
          {count}
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-50"
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[88%] max-w-sm bg-white z-[60] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-widest">
                Shopping Cart
              </p>
              <h2 className="text-2xl font-black">Your Basket</h2>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border border-gray-100 rounded-2xl p-3"
              >
                <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-sm line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>

                  <p className="font-black mt-1">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 text-xs font-bold mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 font-semibold">Total</span>
              <span className="text-xl font-black">${total.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="bg-gray-100 text-black py-3 rounded-2xl font-bold text-center"
              >
                View Cart
              </Link>

              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="bg-black text-white py-3 rounded-2xl font-bold text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}