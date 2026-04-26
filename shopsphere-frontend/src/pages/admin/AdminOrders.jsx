import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Admin Panel
          </p>
          <h1 className="text-4xl font-extrabold mt-2">Manage Orders</h1>
          <p className="text-gray-500 mt-3">
            View customer orders and update order statuses.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex flex-wrap justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">
                      Customer: {order.user?.name} — {order.user?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 min-w-48">
                    <p className="font-bold text-right">
                      ${Number(order.total).toFixed(2)}
                    </p>

                    <select
                      className="border border-gray-200 rounded-2xl px-4 py-2 outline-none focus:border-black"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm border-b border-gray-50 pb-3 last:border-b-0"
                    >
                      <span className="font-medium">
                        {item.product?.name || "Product"}
                      </span>
                      <span className="text-gray-500">
                        {item.quantity} × ${Number(item.price).toFixed(2)} = $
                        {Number(item.subtotal).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 bg-gray-50 rounded-2xl p-4 text-sm text-gray-600">
                  <p className="font-semibold text-black mb-2">Shipping</p>
                  <p>{order.shipping_name}</p>
                  <p>{order.shipping_email}</p>
                  <p>{order.shipping_phone}</p>
                  <p>{order.shipping_address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}