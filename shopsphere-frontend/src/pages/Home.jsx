import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data.data.slice(0, 4)))
      .catch((err) => console.error(err));

    api
      .get("/categories")
      .then((res) => setCategories(res.data.slice(0, 4)))
      .catch((err) => console.error(err));

    api
      .get("/offers")
      .then((res) => setOffers(res.data))
      .catch((err) => console.error(err));

    api
      .get("/hero-images")
      .then((res) => setHeroImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const currentHeroImage = heroImages[activeHeroImage];

  const features = [
    {
      title: "Fast & Secure Checkout",
      description:
        "Complete your order with a smooth, protected checkout experience designed to be simple from start to finish.",
      icon: "🔐",
    },
    {
      title: "Save Your Favorites",
      description:
        "Add products to your cart, review your selections, and continue shopping whenever you are ready.",
      icon: "🛒",
    },
    {
      title: "Fresh Deals & New Arrivals",
      description:
        "Discover updated products, seasonal offers, and curated collections made for everyday shopping.",
      icon: "✨",
    },
  ];

  const steps = [
    {
      title: "Browse the Collection",
      description:
        "Explore products by category, discover new arrivals, and find items that match your style and needs.",
    },
    {
      title: "Add Items to Your Cart",
      description:
        "Choose what you love, adjust quantities, and keep everything ready before checkout.",
    },
    {
      title: "Checkout with Confidence",
      description:
        "Sign in, enter your shipping details, place your order, and follow your purchase status easily.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.35),_transparent_30%),radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_25%)]"></div>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>

        <div className="min-h-[calc(100vh-73px)] max-w-7xl mx-auto px-6 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-slate-300 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              Premium tech deals and new arrivals
            </span>

            <h1 className="mt-7 text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white">
              Upgrade your setup with the latest tech essentials.
            </h1>

            <p className="mt-7 text-lg text-slate-300 max-w-xl leading-relaxed">
              Discover powerful gadgets, smart accessories, and exclusive offers
              designed to make your everyday tech experience faster, cleaner,
              and easier.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-7 py-3.5 rounded-full font-semibold hover:from-cyan-400 hover:to-blue-500 transition shadow-lg shadow-blue-900/40"
              >
                Shop Tech
              </Link>

              <Link
                to="/cart"
                className="bg-white/10 text-white px-7 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/15 transition backdrop-blur"
              >
                View Cart
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-sm backdrop-blur">
                <p className="text-2xl font-black text-white">New</p>
                <p className="text-sm text-slate-400 mt-1">Devices</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-sm backdrop-blur">
                <p className="text-2xl font-black text-white">Fast</p>
                <p className="text-sm text-slate-400 mt-1">Checkout</p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-sm backdrop-blur">
                <p className="text-2xl font-black text-white">Hot</p>
                <p className="text-sm text-slate-400 mt-1">Offers</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-[3rem] blur-2xl"></div>

            <div className="relative bg-white/10 rounded-[2.5rem] shadow-2xl border border-white/10 p-4 backdrop-blur">
              <div className="h-[480px] rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 overflow-hidden">
                {currentHeroImage?.image_url ? (
                  <img
                    src={currentHeroImage.image_url}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                ) : products[0]?.image_url ? (
                  <img
                    src={products[0].image_url}
                    alt={products[0].name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-center px-10">
                    <div>
                      <p className="text-8xl mb-5">💻</p>
                      <h2 className="text-4xl font-black text-white">
                        ShopSphere Tech
                      </h2>
                      <p className="text-slate-400 mt-3">
                        Featured tech products and collections will appear here
                        soon.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {heroImages.length > 1 && (
                <div className="absolute top-8 right-8 flex gap-2">
                  {heroImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveHeroImage(index)}
                      className={`h-2.5 rounded-full transition ${
                        activeHeroImage === index
                          ? "w-8 bg-cyan-400"
                          : "w-2.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                Categories
              </p>
              <h2 className="text-4xl font-black mt-2 text-slate-950">
                Shop by Tech Category
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl">
                Browse products by category and quickly find the tech essentials
                you need.
              </p>
            </div>

            <Link
              to="/products"
              className="text-sm font-bold text-blue-600 hover:text-blue-500 transition"
            >
              Browse full catalog →
            </Link>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="group bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                    🏷️
                  </div>

                  <h3 className="font-black text-xl mt-6 text-slate-950">
                    {category.name}
                  </h3>

                  <p className="text-slate-500 text-sm mt-2">
                    {category.products_count ?? 0} products available
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-10 text-center shadow-sm">
              <p className="text-slate-500">
                Categories will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative bg-slate-50 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                Featured
              </p>
              <h2 className="text-4xl font-black mt-2 text-slate-950">
                Latest Tech Products
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl">
                Discover new devices, accessories, and smart picks added to the
                store.
              </p>
            </div>

            <Link
              to="/products"
              className="text-sm font-bold text-blue-600 hover:text-blue-500 transition"
            >
              View all products →
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-slate-200 p-10 text-center shadow-sm">
              <p className="text-slate-500">
                New tech products will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

    <section className="relative bg-white px-4 sm:px-6 py-16 md:py-24">
  <div className="max-w-7xl mx-auto">
    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-500">
          Limited Deals
        </p>

        <h2 className="mt-3 text-3xl md:text-5xl font-black text-slate-950">
          Tech Offers
        </h2>
      </div>

      <Link
        to="/products"
        className="inline-flex w-fit rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-950 hover:text-white transition"
      >
        View All Products
      </Link>
    </div>

    {offers.length > 0 ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 bg-slate-950 shadow-lg min-h-[360px] md:min-h-[390px] ${
              index === 0 ? "lg:col-span-2 md:min-h-[460px]" : ""
            }`}
          >
            {offer.image_url && (
              <img
                src={offer.image_url}
                alt={offer.title || "Special offer"}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.25),transparent_35%)]" />

            <div className="relative z-10 flex min-h-[360px] md:min-h-[390px] h-full items-start p-6 sm:p-8 md:p-10">
              <div className={`max-w-xl pt-4 ${index === 0 ? "md:max-w-2xl" : ""}`}>
                <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-black text-amber-300 ring-1 ring-amber-300/40 backdrop-blur">
                  Special Tech Offer
                </p>

                <h3 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
                  {offer.title}
                </h3>

                {offer.subtitle && (
                  <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed font-medium text-slate-200">
                    {offer.subtitle}
                  </p>
                )}

                <Link
                  to={offer.button_link || "/products"}
                  className="inline-flex mt-7 rounded-full bg-white px-7 py-3.5 text-sm font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-100"
                >
                  {offer.button_text || "Shop Now"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-slate-950 text-white p-6 sm:p-10 md:p-14 shadow-xl min-h-[380px] flex items-start">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_35%)]" />

        <div className="relative max-w-2xl pt-4">
          <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm text-amber-300 uppercase tracking-[0.18em] font-black ring-1 ring-amber-300/40 backdrop-blur">
            Special Tech Offer
          </p>

          <h3 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
            Discover deals made for your next upgrade.
          </h3>

          <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-slate-300">
            Check back soon for exclusive tech offers, seasonal picks, and
            limited-time promotions.
          </p>

          <Link
            to="/products"
            className="inline-flex mt-7 rounded-full bg-white px-7 py-3.5 text-sm font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-100"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )}
  </div>
</section>

    
<section className="relative overflow-hidden bg-[#020617] px-6 py-20">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.28),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.16),_transparent_28%)]"></div>
  <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
  <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>

  <div className="max-w-7xl mx-auto relative">
    <div className="bg-white/10 rounded-[2.5rem] border border-white/10 shadow-2xl p-8 md:p-10 backdrop-blur">
      <div className="max-w-2xl mb-8">
        <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
          Why Shop With Us
        </p>

        <h2 className="text-4xl font-black mt-2 text-white">
          Everything you need for a smarter shopping experience
        </h2>

        <p className="text-slate-300 mt-3">
          From product discovery to checkout, every step is designed to feel
          simple, fast, and reliable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[2rem] bg-white/10 p-6 border border-white/10 hover:bg-white/15 hover:shadow-xl transition backdrop-blur"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-2xl shadow-sm">
              {feature.icon}
            </div>

            <h3 className="font-black text-xl mt-6 text-white">
              {feature.title}
            </h3>

            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      <section className="relative bg-slate-50 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
              How It Works
            </p>
            <h2 className="text-4xl font-black mt-2 text-slate-950">
              Upgrade your setup in three simple steps
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl">
              Choose your product, add it to cart, and complete checkout with a
              smooth shopping flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 relative overflow-hidden hover:shadow-lg transition"
              >
                <div className="absolute -right-8 -top-8 text-8xl font-black text-slate-100">
                  {index + 1}
                </div>

                <div className="relative w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black shadow-lg">
                  {index + 1}
                </div>

                <h3 className="relative font-black text-xl mt-6 text-slate-950">
                  {step.title}
                </h3>

                <p className="relative text-slate-500 text-sm mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-slate-950 text-white rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"></div>

            <div className="relative">
              <p className="text-sm text-cyan-300 uppercase tracking-widest font-bold">
                Start Shopping
              </p>

              <h2 className="text-3xl md:text-5xl font-black mt-3">
                Your next tech upgrade is waiting.
              </h2>

              <p className="text-slate-300 mt-3 max-w-xl">
                Browse the latest devices, explore special offers, and enjoy a
                simple checkout experience whenever you are ready.
              </p>
            </div>

            <Link
              to="/products"
              className="relative bg-white text-slate-950 px-7 py-3.5 rounded-full font-bold hover:bg-slate-200 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#020617] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black">
                  S
                </div>
                <span className="text-2xl font-black">ShopSphere Tech</span>
              </Link>

              <p className="text-slate-400 mt-5 max-w-md leading-relaxed">
                A modern tech store for discovering gadgets, accessories,
                special offers, and a smooth shopping experience from cart to
                checkout.
              </p>
            </div>

            <div>
              <h3 className="font-black text-lg">Shop</h3>

              <div className="mt-5 space-y-3">
                <Link
                  to="/products"
                  className="block text-slate-400 hover:text-white transition"
                >
                  All Products
                </Link>

                <Link
                  to="/cart"
                  className="block text-slate-400 hover:text-white transition"
                >
                  Cart
                </Link>

                <Link
                  to="/orders"
                  className="block text-slate-400 hover:text-white transition"
                >
                  My Orders
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg">Account</h3>

              <div className="mt-5 space-y-3">
                <Link
                  to="/login"
                  className="block text-slate-400 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block text-slate-400 hover:text-white transition"
                >
                  Create Account
                </Link>

                <Link
                  to="/products"
                  className="block text-slate-400 hover:text-white transition"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">
            <p>
              © {new Date().getFullYear()} ShopSphere Tech. All rights
              reserved.
            </p>
            <p>Built for a smooth and modern tech shopping experience.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}