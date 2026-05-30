// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/api";
// import toast from "react-hot-toast";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await api.post(`/auth/reset-password/${token}`, {
//         password,
//       });

//       toast.success(res.data.message);

//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-[80vh] flex items-center justify-center px-4">
//       <form
//         onSubmit={handleResetPassword}
//         className="w-full max-w-md rounded-[2rem] border border-pink-100 bg-white p-8 shadow-2xl"
//       >
//         <h1 className="text-3xl font-bold text-gray-950">
//           Reset Password
//         </h1>

//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mt-6 w-full rounded-full border border-pink-100 px-5 py-4 outline-none focus:ring-4 focus:ring-pink-100"
//           required
//         />

//         <button
//           disabled={loading}
//           className="mt-5 w-full rounded-full bg-black py-4 font-semibold text-white disabled:opacity-50"
//         >
//           {loading ? "Updating..." : "Reset Password"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default ResetPassword;


import { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { LockKeyhole, Sparkles } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 shadow-[0_30px_100px_rgba(236,72,153,0.18)] backdrop-blur-xl lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={16} />
              SkinCare Security
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight">
              Create a new password.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-white/85">
              Choose a strong password to keep your skincare account protected.
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/20 bg-white/15 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white/80">
              Secure Update
            </p>
            <h3 className="mt-2 text-2xl font-black">
              Your old password will be replaced instantly.
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[4px] text-pink-600">
                Password Recovery
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-950">
                Reset Password
              </h2>

              <p className="mt-3 text-gray-500">
                Enter your new password below.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-700">
                  New Password
                </label>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={19}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400"
                  />

                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                    required
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full rounded-full bg-black py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>

            <div className="mt-7 text-center">
              <NavLink
                to="/login"
                className="font-black text-pink-600 hover:text-pink-700"
              >
                Back to Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;