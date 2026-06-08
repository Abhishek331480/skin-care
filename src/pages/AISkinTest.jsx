import { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AISkinTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    skinType: "",
    concerns: "",
    sensitivity: "",
    currentRoutine: "",
    budget: "",
  });

  const fieldClass =
    "w-full rounded-xl border border-[#ead7df] bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none transition focus:border-[#c77d96] focus:ring-4 focus:ring-[#f7dbe6]";

  const labelClass =
    "mb-1.5 block text-[11px] font-black uppercase tracking-widest text-gray-500";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/ai/skin-test", formData);
      setResult(res.data.result);
     setRecommendedProducts(res.data.recommendedProducts || []);
      setTimeout(() => {
        document.getElementById("ai-result")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
      toast.success("Analysis generated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate analysis",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-[#f8f1f3] px-4 py-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_80px_rgba(80,40,55,0.12)]">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            {/* LEFT BLOCK */}
            <div className="relative hidden overflow-hidden bg-[#21151a] p-7 text-white lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,172,190,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_30%)]" />

              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <div>
                  <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-pink-100">
                    Luxury AI Skin Lab
                  </p>

                  <h1 className="text-4xl font-black leading-tight">
                    Discover your perfect skincare ritual.
                  </h1>

                  <p className="mt-4 max-w-md text-sm font-medium leading-6 text-white/65">
                    Personalized AI analysis based on your skin type, concerns,
                    sensitivity, routine and budget.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    "Skin Diagnosis",
                    "Morning Ritual",
                    "Night Repair Plan",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-200 text-xs font-black text-[#21151a]">
                        0{index + 1}
                      </span>
                      <p className="text-sm font-bold text-white/85">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT FORM BLOCK */}
            <div className="bg-gradient-to-br from-white via-[#fff8fa] to-[#f8eef2] p-5 lg:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c77d96] lg:hidden">
                    Luxury AI Skin Lab
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-gray-950">
                    Skin Consultation
                  </h2>

                  <p className="mt-1 text-sm font-medium text-gray-500">
                    Fill details to generate your AI skin report.
                  </p>
                </div>

                <div className="hidden rounded-2xl bg-[#21151a] px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white sm:block">
                  AI Test
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Your age"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={fieldClass}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Skin Type</label>
                    <select
                      name="skinType"
                      value={formData.skinType}
                      onChange={handleChange}
                      className={fieldClass}
                    >
                      <option value="">Select skin type</option>
                      <option value="Oily">Oily</option>
                      <option value="Dry">Dry</option>
                      <option value="Sensitive">Sensitive</option>
                      <option value="Combination">Combination</option>
                      <option value="Acne">Acne Prone</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Sensitivity</label>
                    <select
                      name="sensitivity"
                      value={formData.sensitivity}
                      onChange={handleChange}
                      className={fieldClass}
                    >
                      <option value="">Sensitivity level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Budget</label>
                    <input
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="₹1000 - ₹2000"
                      className={fieldClass}
                    />
                  </div>

                  <div className="md:col-span-2 xl:col-span-3">
                    <label className={labelClass}>Concerns</label>
                    <textarea
                      name="concerns"
                      value={formData.concerns}
                      onChange={handleChange}
                      placeholder="Acne, pigmentation, dark spots..."
                      className={`${fieldClass} min-h-16 resize-none`}
                    />
                  </div>

                  <div className="md:col-span-2 xl:col-span-3">
                    <label className={labelClass}>Current Routine</label>
                    <textarea
                      name="currentRoutine"
                      value={formData.currentRoutine}
                      onChange={handleChange}
                      placeholder="Your current skincare routine..."
                      className={`${fieldClass} min-h-16 resize-none`}
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="mt-5 w-full rounded-xl bg-[#21151a] px-6 py-3.5 text-xs font-black uppercase tracking-[0.25em] text-white shadow-[0_16px_35px_rgba(33,21,26,0.25)] transition hover:-translate-y-0.5 hover:bg-[#3a202b] disabled:opacity-60"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>AI is analyzing your skin...</span>
                    </div>
                  ) : (
                    "Generate Skin Report"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT SEPARATE SECTION */}
      {result && (
        <section id="ai-result" className="px-4 py-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#ead7df] bg-gradient-to-br from-[#fff8fa] to-white p-6 shadow-[0_20px_70px_rgba(80,40,55,0.10)]">
            <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#c77d96]">
                  AI Generated Report
                </p>

                <h2 className="mt-2 text-3xl font-black text-gray-950">
                  Your Personalized Skin Analysis
                </h2>
              </div>

              <span className="rounded-full bg-[#21151a] px-5 py-2 text-xs font-black uppercase tracking-widest text-white">
                Premium Report
              </span>
            </div>

            <div className="rounded-2xl border border-[#ead7df] bg-white p-5">
              <h3 className="mb-2 text-lg font-black text-gray-950">
                Skin Summary
              </h3>

              <p className="text-sm font-semibold leading-7 text-gray-700">
                {result.skinSummary}
              </p>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <ReportList
                title="Morning Routine"
                items={result.morningRoutine}
              />

              <ReportList title="Night Routine" items={result.nightRoutine} />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <ReportList
                title="Recommended Ingredients"
                items={result.recommendedIngredients}
              />

              <ReportList
                title="Avoid Ingredients"
                items={result.avoidIngredients}
              />

              <ReportList title="Extra Tips" items={result.extraTips} />
            </div>
          </div>
        </section>
      )}
      {recommendedProducts.length > 0 && (
  <div className="mt-8">
    <div className="mb-5">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#c77d96]">
        Matched Products
      </p>

      <h3 className="mt-2 text-2xl font-black text-gray-950">
        Recommended Products For You
      </h3>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {recommendedProducts.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="rounded-2xl border border-[#ead7df] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-44 w-full rounded-xl object-cover"
          />

          <p className="mt-4 text-xs font-black uppercase text-[#c77d96]">
            {product.category}
          </p>

          <h4 className="mt-1 line-clamp-1 font-black text-gray-950">
            {product.name}
          </h4>

          <p className="mt-2 font-black text-gray-950">
            {product.variants?.length > 0
              ? `From ₹${product.price}`
              : `₹${product.price}`}
          </p>
        </Link>
      ))}
    </div>
  </div>
)}
    </>
  );
};

const ReportList = ({ title, items }) => {
  return (
    <div className="rounded-2xl border border-[#ead7df] bg-white p-5">
      <h4 className="mb-4 text-sm font-black uppercase tracking-widest text-gray-500">
        {title}
      </h4>

      <div className="space-y-3">
        {Array.isArray(items) &&
          items.map((item, index) => (
            <div key={index} className="flex gap-3 rounded-xl bg-[#f8eef2] p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#21151a] text-xs font-black text-white">
                {index + 1}
              </span>

              <p className="text-sm font-semibold leading-6 text-gray-700">
                {item}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AISkinTest;
