import React from "react";
import toast from "react-hot-toast";
import api from "../api/api";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      toast.success(res.data.message || "Registration successful");

      setUsername("");
      setEmail("");
      setPassword("");

      // navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
  setUsername("");
  setEmail("");
  setPassword("");
}, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-pink-50 to-white">
      <div className="w-full max-w-md bg-white border border-pink-100 rounded-[2rem] p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Register Page
          </h1>

          <p className="mt-3 text-gray-600 leading-7">
            Register to continue your skincare journey.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-2 border border-pink-100 rounded-full px-5 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 border border-pink-100 rounded-full px-5 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
               autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black py-4 text-white font-semibold text-lg hover:bg-gray-900 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <NavLink
          to="/login"
          className="block mt-6 text-center text-pink-600 font-medium"
        >
          Already have an account? Login
        </NavLink>
      </div>
    </div>
  );
};

export default Register;