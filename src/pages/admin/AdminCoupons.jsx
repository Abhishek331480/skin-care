import { useEffect, useState } from "react";
import {
  TicketPercent,
  BadgeCheck,
  BadgeX,
  Percent,
  Trash2,
  Power,
  Plus,
  Sparkles,
} from "lucide-react";
import api from "../../api/api";
import toast from "react-hot-toast";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingCouponId, setEditingCouponId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minOrderAmount: "",
    expiresAt: "",
  });

  const fetchCoupons = async () => {
    try {
      const res = await api.get("/coupons");
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleCoupon = async (coupon) => {
    try {
      const res = await api.put(`/coupons/${coupon._id}`, {
        isActive: !coupon.isActive,
      });

      toast.success(res.data.message);
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to update coupon");
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCouponId(coupon._id);

    setFormData({
      code: coupon.code || "",
      discountType: coupon.discountType || "PERCENTAGE",
      discountValue: coupon.discountValue || "",
      minOrderAmount: coupon.minOrderAmount || "",
      expiresAt: coupon.expiresAt ? coupon.expiresAt.slice(0, 10) : "",
    });
  };

  const handleDeleteCoupon = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this coupon?",
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/coupons/${id}`);
      toast.success(res.data.message);
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (editingCouponId) {
        res = await api.put(`/coupons/${editingCouponId}`, formData);
      } else {
        res = await api.post("/coupons", formData);
      }

      toast.success(res.data.message);

      setFormData({
        code: "",
        discountType: "PERCENTAGE",
        discountValue: "",
        minOrderAmount: "",
        expiresAt: "",
      });

      setEditingCouponId(null);

      fetchCoupons();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (editingCouponId
            ? "Failed to update coupon"
            : "Failed to create coupon"),
      );
    }
  };

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((coupon) => coupon.isActive).length;
  const expiredCoupons = coupons.filter(
    (coupon) => coupon.expiresAt && new Date(coupon.expiresAt) < new Date(),
  ).length;
  const percentageCoupons = coupons.filter(
    (coupon) => coupon.discountType === "PERCENTAGE",
  ).length;

  const statsCards = [
    {
      title: "Total Coupons",
      value: totalCoupons,
      icon: TicketPercent,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Active Coupons",
      value: activeCoupons,
      icon: BadgeCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Expired Coupons",
      value: expiredCoupons,
      icon: BadgeX,
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Percentage Coupons",
      value: percentageCoupons,
      icon: Percent,
      color: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="mb-8 relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/75 p-6 md:p-8 shadow-[0_20px_70px_rgba(236,72,153,0.18)] backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700">
            <Sparkles size={16} />
            Coupon Control Center
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-950">
            Coupon Management
          </h1>

          {/* <p className="mt-3 max-w-2xl text-gray-500">
            Create, manage, activate and delete premium discount coupons from
            one luxury admin panel.
          </p> */}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/85 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(236,72,153,0.14)]"
            >
              {/* glow */}
              <div
                className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-2xl`}
              />

              {/* top row */}
              <div className="relative flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
                >
                  <Icon size={20} />
                </div>

                {/* <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" /> */}
              </div>

              {/* content */}
              <div className="relative mt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                  {card.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* <form
        onSubmit={handleCreateCoupon}
        className="mb-8 rounded-[2.5rem] border border-white/70 bg-white/85 p-5 md:p-7 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl"
      >
        <div className="mb-6">
          <p className="text-sm font-bold text-pink-600">
            {editingCouponId ? "Update Coupon" : "Create Coupon"}
          </p>

          <h2 className="text-3xl font-black text-gray-950">
            {editingCouponId ? "Edit Existing Discount" : "Add New Discount"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={handleChange}
            className="rounded-2xl border border-pink-100 bg-pink-50/40 px-5 py-4 font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
            required
          />

          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="rounded-2xl border border-pink-100 bg-pink-50/40 px-5 py-4 font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED">Fixed</option>
          </select>

          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            value={formData.discountValue}
            onChange={handleChange}
            className="rounded-2xl border border-pink-100 bg-pink-50/40 px-5 py-4 font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
            required
          />

          <input
            type="number"
            name="minOrderAmount"
            placeholder="Minimum Order Amount"
            value={formData.minOrderAmount}
            onChange={handleChange}
            className="rounded-2xl border border-pink-100 bg-pink-50/40 px-5 py-4 font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
          />

          <input
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="rounded-2xl border border-pink-100 bg-pink-50/40 px-5 py-4 font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
          />

          <button
            type="submit"
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gray-950 via-pink-900 to-gray-950 px-6 py-4 font-black text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <Plus size={20} />
            {editingCouponId ? "Update Coupon" : "Create Coupon"}
          </button>
        </div>
      </form> */}
      <form
  onSubmit={handleCreateCoupon}
  className="mb-6 sm:mb-8 rounded-3xl md:rounded-[2.5rem] border border-white/70 bg-white/85 p-4 sm:p-5 md:p-7 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl"
>
  <div className="mb-5 sm:mb-6">
    <p className="text-xs sm:text-sm font-bold text-pink-600">
      {editingCouponId ? "Update Coupon" : "Create Coupon"}
    </p>

    <h2 className="mt-1 text-2xl sm:text-3xl font-black text-gray-950">
      {editingCouponId ? "Edit Existing Discount" : "Add New Discount"}
    </h2>
  </div>

  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
    <input
      type="text"
      name="code"
      placeholder="Coupon Code"
      value={formData.code}
      onChange={handleChange}
      className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
      required
    />

    <select
      name="discountType"
      value={formData.discountType}
      onChange={handleChange}
      className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
    >
      <option value="PERCENTAGE">Percentage</option>
      <option value="FIXED">Fixed</option>
    </select>

    <input
      type="number"
      name="discountValue"
      placeholder="Discount Value"
      value={formData.discountValue}
      onChange={handleChange}
      className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
      required
    />

    <input
      type="number"
      name="minOrderAmount"
      placeholder="Minimum Order Amount"
      value={formData.minOrderAmount}
      onChange={handleChange}
      className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
    />

    <input
      type="date"
      name="expiresAt"
      value={formData.expiresAt}
      onChange={handleChange}
      className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold outline-none transition focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
    />

    <button
      type="submit"
      className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gray-950 via-pink-900 to-gray-950 px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-black text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl md:col-span-2 xl:col-span-1"
    >
      <Plus size={18} className="sm:h-5 sm:w-5" />
      {editingCouponId ? "Update Coupon" : "Create Coupon"}
    </button>
  </div>
</form>

      <div className="rounded-[2.5rem] border border-white/70 bg-white/85 p-5 md:p-7 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-pink-600">Coupon List</p>
            <h2 className="text-3xl font-black text-gray-950">All Coupons</h2>
          </div>

          <span className="rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700">
            {coupons.length} Total
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-3xl bg-pink-100"
              />
            ))}
          </div>
        ) : coupons.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-pink-200 bg-pink-50/60 p-10 text-center">
            <p className="font-bold text-gray-700">No coupons found.</p>
            <p className="mt-1 text-sm text-gray-500">
              Create your first coupon from above form.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon) => {
              const isExpired =
                coupon.expiresAt && new Date(coupon.expiresAt) < new Date();

              return (
                <div
                  key={coupon._id}
                  className="group flex flex-col gap-5 rounded-3xl border border-pink-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-xl md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg">
                      <TicketPercent size={26} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-black tracking-wide text-gray-950">
                          {coupon.code}
                        </h2>

                       

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-black ${
                            coupon.isActive
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-gray-200 bg-gray-50 text-gray-500"
                          }`}
                        >
                          {coupon.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>


                        {isExpired && (
                          <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-black text-red-600">
                            EXPIRED
                          </span>
                        )}
                        
                      </div>

                      <p className="mt-1 text-sm font-semibold text-gray-500">
                        {coupon.discountType} discount • {coupon.discountValue}
                        {coupon.discountType === "PERCENTAGE" ? "%" : "₹"} off
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Min Order: ₹{coupon.minOrderAmount || 0}{" "}
                        {coupon.expiresAt &&
                          `• Expires: ${new Date(
                            coupon.expiresAt,
                          ).toLocaleDateString("en-IN")}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 md:justify-end">
                    <button
                      onClick={() => handleToggleCoupon(coupon)}
                      className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                        coupon.isActive
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      <Power size={16} />
                      {coupon.isActive ? "Disable" : "Enable"}
                    </button>

                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="flex items-center gap-2 rounded-full bg-blue-50 px-5 py-3 text-sm font-black text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className="flex items-center gap-2 rounded-full bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
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

export default AdminCoupons;
