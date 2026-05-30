import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import {
  TicketPercent,
  Copy,
  Sparkles,
  CalendarDays,
  ShoppingBag,
} from "lucide-react";

const MyCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState("");

  const fetchCoupons = async () => {
    try {
      const res = await api.get("/coupons/available");
      setCoupons(res.data.coupons);
    } catch (error) {
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon copied");

    setTimeout(() => setCopiedCode(""), 1500);
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-pink-100" />
          <p className="mt-5 font-black text-gray-900">Loading coupons...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl sm:p-8">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-pink-200/50 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-rose-200/50 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-pink-600">
                <Sparkles size={15} />
                Exclusive Offers
              </div>

              <h1 className="mt-4 text-3xl font-black text-gray-950 sm:text-5xl">
                My Coupons
              </h1>

              <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-gray-500 sm:text-base">
                Copy your coupon code and apply it at checkout to save more on
                your skincare order.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-gray-950 px-6 py-5 text-white shadow-xl">
              <p className="text-sm font-bold text-pink-200">Available</p>
              <p className="mt-1 text-4xl font-black">{coupons.length}</p>
              <p className="text-xs font-semibold text-gray-300">coupons</p>
            </div>
          </div>
        </div>

        {coupons.length === 0 ? (
          <div className="rounded-[2rem] border border-white bg-white p-10 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-pink-600">
              <TicketPercent size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-950">
              No coupons available
            </h2>

            <p className="mt-2 text-sm font-semibold text-gray-500">
              New offers will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {coupons.map((coupon) => {
              const discountText =
                coupon.discountType === "PERCENTAGE"
                  ? `${coupon.discountValue}% OFF`
                  : `₹${coupon.discountValue} OFF`;

              return (
                <div
                  key={coupon._id}
                  className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-pink-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Ticket circles */}
                  <div className="absolute -left-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-pink-50" />
                  <div className="absolute -right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-pink-50" />

                  {/* Top */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-pink-950 p-6 text-white">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/30 blur-2xl" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-pink-200">
                          Coupon Code
                        </p>

                        <h2 className="mt-3 break-all text-3xl font-black tracking-wide">
                          {coupon.code}
                        </h2>
                      </div>

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-pink-200 backdrop-blur">
                        <TicketPercent size={28} />
                      </div>
                    </div>

                    <div className="relative mt-6 inline-flex rounded-full bg-white px-5 py-2 text-lg font-black text-gray-950">
                      {discountText}
                    </div>
                  </div>

                  {/* Dashed separator */}
                  <div className="border-t border-dashed border-pink-200" />

                  {/* Bottom */}
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-pink-50 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <ShoppingBag size={18} className="text-pink-600" />
                          <span className="text-sm font-bold text-gray-500">
                            Minimum Order
                          </span>
                        </div>

                        <span className="font-black text-gray-950">
                          ₹{coupon.minOrderAmount || 0}
                        </span>
                      </div>

                      {coupon.expiresAt && (
                        <div className="flex items-center justify-between gap-4 rounded-2xl bg-red-50 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <CalendarDays size={18} className="text-red-500" />
                            <span className="text-sm font-bold text-gray-500">
                              Expires
                            </span>
                          </div>

                          <span className="font-black text-red-500">
                            {new Date(coupon.expiresAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => copyCoupon(coupon.code)}
                      className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-black text-white shadow-lg transition ${
                        copiedCode === coupon.code
                          ? "bg-green-600"
                          : "bg-gray-950 hover:bg-pink-600"
                      }`}
                    >
                      <Copy size={18} />
                      {copiedCode === coupon.code ? "Copied" : "Copy Code"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCoupons;