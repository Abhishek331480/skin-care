import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { Sparkles, Mail, LockKeyhole,Eye, EyeOff,  } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      dispatch(setUser(res.data.user));
      setShowResend(false);

      toast.success(res.data.message || "Login successful");

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";

      toast.error(message);

      if (message === "Please verify your email first") {
        setShowResend(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 shadow-[0_30px_100px_rgba(236,72,153,0.18)] backdrop-blur-xl lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={16} />
              SkinCare Luxury
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight">
              Glow starts with your account.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-white/85">
              Login to manage your skincare journey, orders, wishlist and
              personalized product experience.
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/20 bg-white/15 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white/80">
              Premium Experience
            </p>
            <h3 className="mt-2 text-2xl font-black">
              Secure login. Verified users. Smooth shopping.
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[4px] text-pink-600">
                Welcome Back
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-950">
                Login to your account
              </h2>

              <p className="mt-3 text-gray-500">
                Continue your skincare journey with us.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700">
                  Email Address
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="login-email"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

             <div>
  <label className="text-sm font-bold text-gray-700">
    Password
  </label>

  <div className="relative mt-2">
    <LockKeyhole
      size={19}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
    />

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-14 font-medium outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      name="login-password"
      autoComplete="current-password"
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-pink-600"
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>

              <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                {showResend ? (
                  <NavLink
                    to="/resend-verification"
                    className="font-bold text-pink-600 hover:text-pink-700"
                  >
                    Resend verification email
                  </NavLink>
                ) : (
                  <span />
                )}

                <NavLink
                  to="/forgot-password"
                  className="font-bold text-pink-600 hover:text-pink-700"
                >
                  Forgot Password?
                </NavLink>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-7 text-center">
              <p className="text-gray-500">
                Don&apos;t have an account?{" "}
                <NavLink
                  to="/register"
                  className="font-black text-pink-600 hover:text-pink-700"
                >
                  Register
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;