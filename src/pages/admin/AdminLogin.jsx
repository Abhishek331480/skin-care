import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await api.post("/auth/admin/login", {
      email,
      password,
    });

    dispatch(setUser(res.data.user));

    toast.success("Admin login successful");
    navigate("/admin");
  } catch (error) {
    toast.error(error.response?.data?.message || "Admin login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4">
      <form
        onSubmit={handleAdminLogin}
        className="w-full max-w-md rounded-[2rem] border border-pink-100 bg-white p-8 shadow-2xl"
      >
        <h1 className="text-4xl font-black text-gray-950">
          Admin Login
        </h1>

        <p className="mt-3 text-gray-500">
          Login to access skincare admin dashboard.
        </p>

        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-pink-100 px-5 py-4 outline-none focus:ring-4 focus:ring-pink-100"
            required
          />

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full border border-pink-100 px-5 py-4 outline-none focus:ring-4 focus:ring-pink-100"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-full bg-black py-4 font-black text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;