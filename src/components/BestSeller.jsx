import { Star, ShoppingBag, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../store/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

 useEffect(() => {
  const fetchBestSellers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products/best-sellers");
      setBestSellers(res.data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchBestSellers();
}, []);

  const handleWishlist = async (product) => {
  try {
    const res = await api.post(`/wishlist/${product._id}`);

    dispatch(setWishlist(res.data.wishlist));

    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Wishlist update failed");
  }
};

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[4px] uppercase text-pink-500 font-semibold">
            Best Seller
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            Loved by Skincare Lovers
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Premium skincare products for glowing, healthy and beautiful skin.
          </p>
        </div>

        {loading ? (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="
          overflow-hidden rounded-[2.2rem]
          border border-pink-100 bg-white/80 p-3
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
      >
        <div className="h-64 animate-pulse rounded-[1.8rem] bg-pink-100" />

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="h-7 w-24 animate-pulse rounded-full bg-pink-100" />
            <div className="h-7 w-16 animate-pulse rounded-full bg-amber-100" />
          </div>

          <div className="h-4 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-7 w-3/4 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-200" />

          <div className="flex items-end justify-between border-t border-pink-100 pt-5">
            <div>
              <div className="mb-2 h-3 w-14 animate-pulse rounded-full bg-gray-200" />
              <div className="h-9 w-24 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="h-12 w-12 animate-pulse rounded-full bg-pink-100" />
          </div>

          <div className="h-12 w-full animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
) : bestSellers.length === 0 ? (
          <div className="rounded-[2rem] border border-pink-100 bg-white p-10 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-gray-950">
              No best sellers yet
            </h3>
            <p className="mt-2 text-gray-500">
              Best seller products will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((product) => {
              const isWishlisted = wishlistItems.some(
                (item) => item._id === product._id,
              );

              const displayStock =
                product.variants?.length > 0
                  ? product.variants.reduce(
                      (total, variant) => total + Number(variant.stock || 0),
                      0,
                    )
                  : product.stock;

              return (
                <div
  key={product._id}
  className="
    group relative overflow-hidden rounded-[2.2rem]
    border border-white/70 bg-white/80
    shadow-[0_20px_60px_rgba(15,23,42,0.08)]
    backdrop-blur-2xl transition-all duration-500
    hover:-translate-y-2
    hover:shadow-[0_35px_90px_rgba(236,72,153,0.20)]
  "
>
  <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/70 to-rose-100/60 opacity-80" />

  <div className="relative">
    <Link to={`/product/${product._id}`}>
      <div className="relative m-3 h-64 overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-pink-100 to-rose-100">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="
            h-full w-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-pink-700 shadow-lg backdrop-blur-xl">
          Best Seller
        </span>

        {displayStock <= 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
            Out of Stock
          </span>
        )}

        {product.totalSold > 0 && (
          <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
            {product.totalSold} sold
          </span>
        )}
      </div>
    </Link>

    <div className="px-6 pb-6 pt-2">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-pink-600">
          {product.category}
        </span>

        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-600">
          <Star size={14} fill="currentColor" />
          {product.rating || 0}
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400">
        {product.brand || "SkinCare"}
      </p>

      <Link to={`/product/${product._id}`}>
        <h3 className="mt-1 line-clamp-1 text-xl font-black text-gray-950 transition group-hover:text-pink-600">
          {product.name}
        </h3>
      </Link>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
        {product.description}
      </p>

      <div className="mt-5 flex items-end justify-between border-t border-pink-100/70 pt-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Price
          </p>

          <p className="text-3xl font-black text-gray-950">
            ₹{product.price}
          </p>

          <p className="mt-1 text-xs font-semibold text-gray-400">
            {product.numReviews || 0} reviews · {displayStock} left
          </p>
        </div>

    
        <button
          
          onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  handleWishlist(product);
}}
          className="
            absolute bottom-24 right-4 flex h-12 w-12 items-center justify-center
            rounded-full border border-white/50 bg-white/90 text-pink-600
            shadow-xl backdrop-blur-xl transition-all duration-300
            hover:scale-110 hover:bg-pink-600 hover:text-white
          "
        >
          <Heart size={19} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <Link
        to={`/product/${product._id}`}
        className="
          mt-5 flex w-full items-center justify-center gap-2 rounded-full
          bg-gradient-to-r from-gray-950 via-pink-700 to-rose-500 py-3
          text-sm font-black text-white shadow-xl shadow-pink-200
          transition-all duration-300
          hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-300
        "
      >
        <ShoppingBag size={17} />
        View Product
      </Link>
    </div>
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

export default BestSeller;
