import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Please check your information and try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Create account
          </p>
          <h1 className="text-4xl font-extrabold mt-2">Register</h1>
          <p className="text-gray-500 mt-3">
            Join ShopSphere and start shopping.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4"
        >
        {error && (
  <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 shadow-sm">
    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
      !
    </div>

    <div className="flex-1">
      <h3 className="text-sm font-semibold text-red-700">
        Registration failed
      </h3>
      <p className="mt-1 text-sm text-red-600 leading-relaxed">
        {error}
      </p>
    </div>
  </div>
)}

        <input
  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
  placeholder="Full name"
  value={form.name}
  required
  minLength={2}
  maxLength={255}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
  className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-black"
  type="email"
  placeholder="Email address"
  value={form.email}
  required
  maxLength={255}
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

<div className="relative">
  <input
    className="w-full border border-gray-200 rounded-2xl px-4 py-3 pr-12 outline-none focus:border-black"
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm password"
    value={form.password_confirmation}
    required
    minLength={8}
    maxLength={255}
    onChange={(e) =>
      setForm({ ...form, password_confirmation: e.target.value })
    }
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
  >
    {showConfirmPassword ? "Hide" : "Show"}
  </button>
</div>

          <button className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition">
            Register
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}