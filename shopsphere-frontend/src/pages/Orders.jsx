import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Orders
          </p>

          <h1 className="text-4xl font-extrabold mt-2">My Orders</h1>

          <p className="text-gray-500 mt-3">
            Track your recent purchases and order status.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm">
            <p className="text-gray-500">You have no orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex flex-wrap justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{index + 1}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex px-4 py-2 rounded-full bg-gray-100 text-sm font-semibold capitalize">
                      {order.status}
                    </span>

                    <p className="font-bold mt-2">
                      ${Number(order.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="font-medium">
                        {item.product?.name || "Product"}
                      </span>

                      <span className="text-gray-500">
                        {item.quantity} × ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}