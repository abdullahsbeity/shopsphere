import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold"
      : "text-gray-500 hover:text-black transition";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "block text-black font-semibold"
      : "block text-gray-600 hover:text-black transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="w-9 h-9 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
            S
          </div>
          <span className="text-xl font-bold tracking-tight">ShopSphere</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>

          <NavLink to="/cart" className={linkClass}>
            Cart
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            Orders
          </NavLink>

          {user?.is_admin && (
            <NavLink to="/admin" className={linkClass}>
              Admin Panel
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Logout
            </button>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 rounded-2xl border border-gray-200 flex items-center justify-center text-2xl"
        >
          {open ? "×" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-5 space-y-4">
            <NavLink to="/" className={mobileLinkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/products" className={mobileLinkClass} onClick={() => setOpen(false)}>
              Products
            </NavLink>

            <NavLink to="/cart" className={mobileLinkClass} onClick={() => setOpen(false)}>
              Cart
            </NavLink>

            <NavLink to="/orders" className={mobileLinkClass} onClick={() => setOpen(false)}>
              Orders
            </NavLink>

            {user?.is_admin && (
              <NavLink to="/admin" className={mobileLinkClass} onClick={() => setOpen(false)}>
                Admin Panel
              </NavLink>
            )}

            <div className="pt-4 border-t border-gray-100">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="text-gray-600 hover:text-black transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition text-center"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  onClick={logout}
                  className="w-full bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}