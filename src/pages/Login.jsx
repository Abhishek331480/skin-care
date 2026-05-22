import React, { useState , useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      toast.success(res.data.message || "Login successful");
      setEmail("");
      setPassword("");
      // navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  setEmail("");
  setPassword("");
}, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-pink-50 to-white">
      <div className="w-full max-w-md bg-white border border-pink-100 rounded-[2rem] p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>

          <p className="mt-3 text-gray-600 leading-7">
            Login to continue your skincare journey.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 border border-pink-100 rounded-full px-5 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               name="login-email"
               autoComplete="off"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 border border-pink-100 rounded-full px-5 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                name="login-password"
               autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black py-4 text-white font-semibold text-lg hover:bg-gray-900 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <NavLink
          to="/register"
          className="block mt-6 text-center text-pink-600 font-medium hover:text-pink-700 transition"
        >
          Don&apos;t have an account? Register
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
