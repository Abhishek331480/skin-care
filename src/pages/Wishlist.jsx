import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  if (wishlistItems.length === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your wishlist is empty</h1>
        <p className="mt-3 text-gray-600">Save your favorite skincare products here.</p>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>

        <button
          onClick={() => dispatch(clearWishlist())}
          className="text-black font-medium border border-red-200 rounded-full px-4 py-2 hover:bg-red-50 transition"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-pink-100 rounded-3xl p-5 shadow-sm"
          >
            {/* <div className="h-48 rounded-2xl bg-pink-100 mb-5" /> */}
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="h-48 w-full object-cover rounded-2xl mb-5 object-center"
            />
            
            <p className="text-sm text-pink-600 font-medium">{item.category}</p>
            <h2 className="text-xl font-bold text-gray-900 mt-2">{item.name}</h2>
            <p className="text-lg font-bold mt-2">₹{item.price}</p>
         
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => dispatch(addToCart(item))}
                className="flex-1 py-3 rounded-full bg-black text-white font-medium"
              >
                Add to Cart
              </button>

              <button
                onClick={() => dispatch(removeFromWishlist(item._id))}
                className="flex-1 py-3 rounded-full border border-red-200 text-red-500 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;