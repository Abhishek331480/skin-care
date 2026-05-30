// import { useState } from "react";
// import api from "../api/api";
// import toast from "react-hot-toast";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [resetToken, setResetToken] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/forgot-password", {
//         email,
//       });

//       toast.success(res.data.message);

//       setResetToken(res.data.resetToken);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to generate token");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-[80vh] flex items-center justify-center px-4">
//       <div className="w-full max-w-md rounded-[2rem] border border-pink-100 bg-white p-8 shadow-2xl">
//         <h1 className="text-3xl font-bold text-gray-950">
//           Forgot Password
//         </h1>

//         <p className="mt-3 text-gray-500">
//           Enter your email to generate reset token.
//         </p>

//         <form onSubmit={handleForgotPassword} className="mt-6 space-y-5">
//           <input
//             type="email"
//             placeholder="Enter registered email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full rounded-full border border-pink-100 px-5 py-4 outline-none focus:ring-4 focus:ring-pink-100"
//             required
//           />

//           <button
//             disabled={loading}
//             className="w-full rounded-full bg-black py-4 font-semibold text-white disabled:opacity-50"
//           >
//             {loading ? "Please wait..." : "Generate Reset Link"}
//           </button>
//         </form>

//         {resetToken && (
//           <div className="mt-6 rounded-2xl bg-pink-50 p-4">
//             <p className="font-semibold text-pink-700">Reset Token:</p>
//             <p className="mt-2 break-all text-sm text-gray-700">
//               {resetToken}
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ForgotPassword;



import { useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { Mail, Sparkles } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);
      setSent(true);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
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
              Reset your password safely.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-white/85">
              We&apos;ll send a secure reset link to your registered email.
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/20 bg-white/15 p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white/80">
              Secure Reset
            </p>
            <h3 className="mt-2 text-2xl font-black">
              Reset links expire automatically for your safety.
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-black uppercase tracking-[4px] text-pink-600">
                Account Recovery
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-950">
                Forgot Password
              </h2>

              <p className="mt-3 text-gray-500">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            {sent && (
              <div className="mb-6 rounded-[1.5rem] border border-green-100 bg-green-50 p-4 text-green-700">
                <p className="font-bold">Reset link sent!</p>
                <p className="mt-1 text-sm">
                  Please check your inbox or spam folder.
                </p>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-5">
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
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-pink-100 bg-pink-50/50 py-4 pl-12 pr-5 font-medium outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
                    required
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full rounded-full bg-black py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;