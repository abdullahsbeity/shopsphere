import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Welcome back
          </p>
          <h1 className="text-4xl font-extrabold mt-2">Login</h1>
          <p className="text-gray-500 mt-3">
            Sign in to manage your cart and orders.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-50 text-red-600 rounded-2xl p-3 text-sm">
              {error}
            </div>
          )}

          <input
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

        <div className="relative">
  <input
    className="w-full border border-gray-200 rounded-2xl px-4 py-3 pr-12 outline-none focus:border-black"
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={form.password}
    required
    minLength={8}
    maxLength={255}
    onChange={(e) => setForm({ ...form, password: e.target.value })}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

          <button className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition">
            Login
          </button>

          <p className="text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-black font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}