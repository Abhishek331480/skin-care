import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, XCircle, GitCompareArrows } from "lucide-react";
import {
  removeFromCompare,
  clearCompare,
} from "../store/slices/compareSlice";

const Compare = () => {
  const dispatch = useDispatch();

  const compareItems = useSelector(
    (state) => state.compare.compareItems
  );

  if (compareItems.length === 0) {
    return (
      <section className="min-h-[70vh] bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center px-4">
        <div className="max-w-md rounded-[2rem] border border-pink-100 bg-white/90 p-8 sm:p-10 text-center shadow-[0_25px_70px_rgba(236,72,153,0.18)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
            <XCircle size={42} className="text-pink-500" />
          </div>

          <h1 className="mt-5 text-2xl sm:text-3xl font-black text-gray-950">
            No products to compare
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-7">
            Add products to compare skin type, benefits, ingredients and price.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-pink-600 px-7 py-3 font-bold text-white shadow-lg shadow-pink-200 hover:bg-pink-700 transition"
          >
            Go to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-white/70 bg-white/80 p-5 sm:p-7 shadow-[0_20px_60px_rgba(236,72,153,0.12)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-[3px] text-pink-600">
              <GitCompareArrows size={18} />
              Product Compare
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950">
              Compare Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm sm:text-base text-gray-500">
              Compare up to 3 skincare products side by side.
            </p>
          </div>

          <button
            onClick={() => dispatch(clearCompare())}
            className="w-full sm:w-auto rounded-full border border-red-100 bg-white px-6 py-3 font-bold text-red-500 shadow-sm hover:bg-red-50 transition"
          >
            Clear All
          </button>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-5 md:hidden">
          {compareItems.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-[0_20px_50px_rgba(236,72,153,0.14)]"
            >
              <div className="relative">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <button
                  onClick={() => dispatch(removeFromCompare(product._id))}
                  className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-red-500 shadow-lg backdrop-blur hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-black text-gray-950">
                  {product.name}
                </h2>

                <Link
                  to={`/product/${product._id}`}
                  className="mt-2 inline-block text-sm font-bold text-pink-600"
                >
                  View Details →
                </Link>

                <div className="mt-5 space-y-3">
                  <MobileFeature label="Price" value={getPrice(product)} />
                  <MobileFeature label="Category" value={product.category || "N/A"} />
                  <MobileFeature label="Skin Type" value={product.skinType || "N/A"} />
                  <MobileFeature label="Rating" value={`⭐ ${product.rating || 0}`} />
                  <MobileFeature label="Stock" value={`${product.stock || 0} left`} />
                  <MobileFeature
                    label="Benefits"
                    value={
                      product.benefits?.length > 0
                        ? product.benefits.join(", ")
                        : "N/A"
                    }
                  />
                  <MobileFeature
                    label="Ingredients"
                    value={
                      product.ingredients?.length > 0
                        ? product.ingredients.join(", ")
                        : "N/A"
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
       {/* Desktop Premium Cards */}
<div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
  {compareItems.map((product) => (
    <div
      key={product._id}
      className="
        group overflow-hidden rounded-[2rem]
        border border-pink-100 bg-white
        shadow-[0_18px_50px_rgba(236,72,153,0.14)]
        hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(236,72,153,0.22)]
        transition-all duration-300
      "
    >
      <div className="relative h-64 overflow-hidden bg-pink-50">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />

        <button
          onClick={() => dispatch(removeFromCompare(product._id))}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-red-500 shadow-lg hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="p-6">
        <p className="mb-2 text-xs font-black uppercase tracking-[2px] text-pink-600">
          {product.category || "SkinCare"}
        </p>

        <h2 className="text-2xl font-black text-gray-950 line-clamp-2">
          {product.name}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <DesktopFeature label="Price" value={getPrice(product)} />
          <DesktopFeature label="Rating" value={`⭐ ${product.rating || 0}`} />
          <DesktopFeature label="Skin Type" value={product.skinType || "N/A"} />
          <DesktopFeature label="Stock" value={`${product.stock || 0} left`} />
        </div>

        <div className="mt-4 space-y-3">
          <DesktopFeature
            label="Benefits"
            value={
              product.benefits?.length > 0
                ? product.benefits.join(", ")
                : "N/A"
            }
          />

          <DesktopFeature
            label="Ingredients"
            value={
              product.ingredients?.length > 0
                ? product.ingredients.join(", ")
                : "N/A"
            }
          />
        </div>

        <Link
          to={`/product/${product._id}`}
          className="
            mt-6 flex w-full items-center justify-center
            rounded-full bg-pink-600 px-6 py-3
            font-bold text-white
            shadow-lg shadow-pink-200
            hover:bg-pink-700 transition
          "
        >
          View Details
        </Link>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

const getPrice = (p) => {
  return p.variants?.length > 0 ? `From ₹${p.price}` : `₹${p.price}`;
};

const CompareRow = ({ label, items, render }) => {
  return (
    <tr className="hover:bg-pink-50/40 transition">
      <td className="bg-pink-50/70 p-6 text-xs font-black uppercase tracking-wider text-gray-500">
        {label}
      </td>

      {items.map((item) => (
        <td
          key={item._id}
          className="p-6 text-sm font-semibold leading-7 text-gray-700"
        >
          {render(item)}
        </td>
      ))}
    </tr>
  );
};

const MobileFeature = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4">
      <p className="text-xs font-black uppercase tracking-wider text-pink-600">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold leading-6 text-gray-700">
        {value}
      </p>
    </div>
  );
};

const DesktopFeature = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4">
      <p className="text-[11px] font-black uppercase tracking-wider text-pink-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold leading-6 text-gray-800">
        {value}
      </p>
    </div>
  );
};

export default Compare;