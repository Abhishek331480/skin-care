// import React from "react";
// import toast from "react-hot-toast";
// import api from "../api/api";
// import { useNavigate, NavLink } from "react-router-dom";

// const Register = () => {
//   const [loading, setLoading] = React.useState(false);
//   const [username, setUsername] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/register", {
//         username,
//         email,
//         password,
//       });

//       toast.success("Registration successful. Please verify your email.");

//       setUsername("");
//       setEmail("");
//       setPassword("");

//       // navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//   setUsername("");
//   setEmail("");
//   setPassword("");
// }, []);

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md bg-white border border-pink-100 rounded-[2rem] p-8 shadow-2xl">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900">
//             Register Page
//           </h1>

//           <p className="mt-3 text-gray-600 leading-7">
//             Register to continue your skincare journey.
//           </p>
//         </div>

//         <form onSubmit={handleRegister} className="space-y-5">
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Username
//             </label>

//             <input
//               type="text"
//               placeholder="Enter your username"
//               className="w-full mt-2 border border-pink-100 rounded-full px-5 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//                 autoComplete="off"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Email
//             </label>

//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full mt-2 border border-pink-100 rounded-full px-5 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="off"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Password
//             </label>

//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full mt-2 border border-pink-100 rounded-full px-5 py-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//                autoComplete="new-password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-full bg-black py-4 text-white font-semibold text-lg hover:bg-gray-900 transition disabled:opacity-50 cursor-pointer"
//           >
//             {loading ? "Creating account..." : "Create Account"}
//           </button>
//         </form>

//         <NavLink
//           to="/login"
//           className="block mt-6 text-center text-pink-600 font-medium"
//         >
//           Already have an account? Login
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React from "react";
import toast from "react-hot-toast";
import api from "../api/api";
import { NavLink } from "react-router-dom";
import { Sparkles, Mail, LockKeyhole, User } from "lucide-react";

const Register = () => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      toast.success(
        res.data.message ||
          "Registration successful. Please verify your email."
      );

      setUsername("");
      setEmail("");
      setPassword("");
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
              Create your glow account.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-white/85">
              Register to access orders, wishlist, coupons, verified reviews and
              personalized skincare shopping.
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/20 bg-white/15 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white/80">
              Secure Signup
            </p>
            <h3 className="mt-2 text-2xl font-black">
              Email verification keeps your account protected.
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[4px] text-pink-600">
                Join Us
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-950">
                Create account
              </h2>

              <p className="mt-3 text-gray-500">
                Start your premium skincare journey today.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700">
                  Username
                </label>

                <div className="relative mt-2">
                  <User
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">
                  Email
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
                    type="password"
                    placeholder="Create a password"
                    className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-7 text-center">
              <p className="text-gray-500">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="font-black text-pink-600 hover:text-pink-700"
                >
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;