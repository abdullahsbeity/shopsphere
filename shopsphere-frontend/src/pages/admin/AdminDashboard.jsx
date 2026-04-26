import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Products",
      description: "Create products, upload images, update stock, and manage your catalog.",
      path: "/admin/products",
      emoji: "📦",
      stat: "Catalog",
      accent: "from-blue-500 to-cyan-500",
    },
    {
      title: "Users",
      description: "View users and make or remove admin access.",
      path: "/admin/users",
      emoji: "👥",
      stat: "Roles",
      accent: "from-violet-500 to-purple-500",
    },
    {
      title: "Orders",
      description: "View customer orders and update order status.",
      path: "/admin/orders",
      emoji: "🧾",
      stat: "Sales",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      title: "Categories",
      description: "Create and organize product categories.",
      path: "/admin/categories",
      emoji: "🏷️",
      stat: "Groups",
      accent: "from-amber-500 to-orange-500",
    },
    {
      title: "Offers",
      description: "Create and update homepage offer cards and promotional banners.",
      path: "/admin/offers",
      emoji: "🔥",
      stat: "Marketing",
      accent: "from-rose-500 to-pink-500",
    },
    {
      title: "Hero Images",
      description: "Upload and manage homepage hero slider images.",
      path: "/admin/hero-images",
      emoji: "🖼️",
      stat: "Homepage",
      accent: "from-sky-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6fb]">
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Dashboard Header */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#07111f] text-white shadow-2xl mb-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.35),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.22),_transparent_30%)]"></div>

          <div className="relative p-8 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Store management workspace
                </span>

                <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight">
                  Admin Control Center
                </h1>

                <p className="text-slate-300 mt-5 max-w-2xl leading-relaxed">
                  Manage your e-commerce platform from one place — products,
                  orders, users, offers, homepage content, and store structure.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="bg-white text-slate-950 px-5 py-3 rounded-full font-bold hover:bg-slate-200 transition"
                >
                  View Store →
                </Link>

                <Link
                  to="/admin/products"
                  className="bg-blue-600 text-white px-5 py-3 rounded-full font-bold hover:bg-blue-500 transition"
                >
                  Add Product
                </Link>
              </div>
            </div>

            {/* Premium stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Workspace</p>
                <h3 className="text-2xl font-black mt-1">Online Store</h3>
                <p className="text-xs text-slate-400 mt-2">Full admin management</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Admin Sections</p>
                <h3 className="text-2xl font-black mt-1">{cards.length} Modules</h3>
                <p className="text-xs text-slate-400 mt-2">Products, users, orders and more</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Access</p>
                <h3 className="text-2xl font-black mt-1">Protected</h3>
                <p className="text-xs text-slate-400 mt-2">Admin-only route control</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Cards */}
          <div className="xl:col-span-3">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-black text-blue-600 uppercase tracking-widest">
                  Manage Store
                </p>
                <h2 className="text-3xl font-black text-slate-950 mt-2">
                  Admin Modules
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                Choose a section to manage your store.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card) => (
                <Link
                  key={card.path}
                  to={card.path}
                  className="group relative overflow-hidden bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition"
                >
                  <div
                    className={`absolute -right-16 -top-16 w-44 h-44 bg-gradient-to-br ${card.accent} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition`}
                  ></div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${card.accent} text-white flex items-center justify-center text-3xl shadow-lg`}
                      >
                        {card.emoji}
                      </div>

                      <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {card.stat}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-950 mt-6">
                      {card.title}
                    </h3>

                    <p className="text-slate-500 mt-3 text-sm leading-relaxed min-h-12">
                      {card.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm font-black text-slate-950">
                        Open {card.title}
                      </span>

                      <span
                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${card.accent} text-white flex items-center justify-center group-hover:scale-110 transition shadow-lg`}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Side Panel */}
          <aside className="xl:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-black text-blue-600 uppercase tracking-widest">
                Quick Actions
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  to="/admin/products"
                  className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-3 transition"
                >
                  <span className="font-bold text-slate-700">New Product</span>
                  <span>＋</span>
                </Link>

                <Link
                  to="/admin/offers"
                  className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-3 transition"
                >
                  <span className="font-bold text-slate-700">New Offer</span>
                  <span>＋</span>
                </Link>

                <Link
                  to="/admin/hero-images"
                  className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-3 transition"
                >
                  <span className="font-bold text-slate-700">Hero Image</span>
                  <span>＋</span>
                </Link>
              </div>
            </div>

            <div className="bg-slate-950 text-white rounded-[2rem] p-6 shadow-xl overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl"></div>

              <div className="relative">
                <p className="text-sm text-blue-200 font-bold uppercase tracking-widest">
                  Store Health
                </p>

                <h3 className="text-3xl font-black mt-3">Ready</h3>

                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Your admin panel includes core e-commerce management tools and
                  dynamic homepage controls.
                </p>

                <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-blue-500 rounded-full"></div>
                </div>

                <p className="text-xs text-slate-400 mt-2">Project completion: 92%</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-black text-slate-950">Admin Tip</p>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Add hero images and offers first to make the homepage look
                complete before taking screenshots for your portfolio.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}