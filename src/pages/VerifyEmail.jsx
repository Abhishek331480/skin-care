// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../api/api";

// const VerifyEmail = () => {
//   const { token } = useParams();
//   const [status, setStatus] = useState("loading");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const res = await api.get(`/auth/verify-email/${token}`);

//         setStatus("success");
//         setMessage(res.data.message);
//       } catch (error) {
//         setStatus("error");
//         setMessage(
//           error.response?.data?.message || "Email verification failed"
//         );
//       }
//     };

//     verifyEmail();
//   }, [token]);

//   return (
//     <section className="min-h-[80vh] flex items-center justify-center px-4">
//       <div className="w-full max-w-md rounded-[2rem] border border-pink-100 bg-white p-8 text-center shadow-2xl">
//         {status === "loading" && (
//           <>
//             <h1 className="text-3xl font-bold">Verifying Email...</h1>
//             <p className="mt-3 text-gray-500">Please wait.</p>
//           </>
//         )}

//         {status === "success" && (
//           <>
//             <h1 className="text-3xl font-bold text-green-600">
//               Email Verified
//             </h1>
//             <p className="mt-3 text-gray-500">{message}</p>

//             <Link
//               to="/login"
//               className="mt-6 inline-block rounded-full bg-black px-6 py-3 font-semibold text-white"
//             >
//               Login Now
//             </Link>
//           </>
//         )}

//         {status === "error" && (
//           <>
//             <h1 className="text-3xl font-bold text-red-600">
//               Verification Failed
//             </h1>
//             <p className="mt-3 text-gray-500">{message}</p>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default VerifyEmail;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);

        setStatus("success");
        setMessage(res.data.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message || "Email verification failed"
        );
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-6 shadow-[0_30px_100px_rgba(236,72,153,0.18)] backdrop-blur-xl">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-black text-pink-700">
            <Sparkles size={16} />
            SkinCare Verification
          </div>

          {status === "loading" && (
            <div className="rounded-[2.5rem] border border-pink-100 bg-white p-8 shadow-2xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                <Loader2 size={40} className="animate-spin" />
              </div>

              <h1 className="mt-6 text-4xl font-black text-gray-950">
                Verifying Email...
              </h1>

              <p className="mt-3 text-gray-500">
                Please wait while we verify your account.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="rounded-[2.5rem] border border-green-100 bg-white p-8 shadow-2xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 size={44} />
              </div>

              <h1 className="mt-6 text-4xl font-black text-green-600">
                Email Verified
              </h1>

              <p className="mt-3 text-gray-500">
                {message || "Your email has been verified successfully."}
              </p>

              <Link
                to="/login"
                className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-gray-900"
              >
                Login Now
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="rounded-[2.5rem] border border-red-100 bg-white p-8 shadow-2xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
                <XCircle size={44} />
              </div>

              <h1 className="mt-6 text-4xl font-black text-red-600">
                Verification Failed
              </h1>

              <p className="mt-3 text-gray-500">
                {message}
              </p>

              <Link
                to="/resend-verification"
                className="mt-8 inline-flex rounded-full bg-pink-600 px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-pink-700"
              >
                Resend Verification Email
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;