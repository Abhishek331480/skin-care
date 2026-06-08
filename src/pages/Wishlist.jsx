import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from "../store/slices/wishlistSlice";
import api from "../api/api";
import toast from "react-hot-toast";
import { setCart } from "../store/slices/cartSlice";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleRemoveWishlist = async (productId) => {
    try {
      const res = await api.post(`/wishlist/${productId}`);
      dispatch(setWishlist(res.data.wishlist));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const selectedVariant = item.variants?.[0] || null;

      const cartKey = selectedVariant
        ? `${item._id}-${selectedVariant.size}`
        : item._id;

      const res = await api.post("/cart", {
        productId: item._id,
        quantity: 1,
        variant: selectedVariant
          ? {
              size: selectedVariant.size,
              price: selectedVariant.price,
              stock: selectedVariant.stock,
              sku: selectedVariant.sku,
            }
          : null,
        cartKey,
      });

      dispatch(setCart(res.data.cart));
      toast.success(`${item.name} added to cart`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add cart");
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md rounded-[2rem] border border-pink-100 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pink-50 text-pink-600">
            <Heart size={30} />
          </div>

          <h1 className="text-3xl font-black text-gray-950">
            Your wishlist is empty
          </h1>

          <p className="mt-3 leading-7 text-gray-500">
            Save your favorite skincare products here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[4px] text-pink-600">
            Saved Products
          </p>

          <h1 className="mt-2 text-4xl font-black text-gray-950">
            My Wishlist
          </h1>
        </div>

        <p className="text-sm font-semibold text-gray-500">
          {wishlistItems.length} product{wishlistItems.length > 1 ? "s" : ""} saved
        </p>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="group overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="relative h-72 overflow-hidden bg-pink-50">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-pink-600 shadow-sm backdrop-blur">
                {item.category}
              </span>

              <button
  onClick={() => handleRemoveWishlist(item._id)}
  className="
    absolute right-4 top-4
    flex h-11 w-11 items-center justify-center
    rounded-full bg-white/90 backdrop-blur-xl
    shadow-lg transition-all duration-300
    hover:scale-110
  "
>
  <Heart
    size={20}
    className="text-pink-600"
    fill="currentColor"
  />
</button>
            </div>

            <div className="p-6">
              <h2 className="line-clamp-1 text-xl font-black text-gray-950">
                {item.name}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                {item.description || "Premium skincare product for healthy glowing skin."}
              </p>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Price
                  </p>

                  <p className="text-3xl font-black text-gray-950">
                    ₹{item.variants?.[0]?.price || item.price}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-gray-900"
                >
                  <ShoppingBag size={17} />
                  Add
                </button>
              </div>

              <button
                onClick={() => handleRemoveWishlist(item._id)}
                className="mt-5 w-full rounded-full border border-red-100 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;