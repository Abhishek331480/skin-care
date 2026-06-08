import { useDispatch, useSelector } from "react-redux";
import { addToCompare } from "../store/slices/compareSlice";
import toast from "react-hot-toast";
import { GitCompareArrows } from "lucide-react";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

const compareItems = useSelector(
  (state) => state.compare.compareItems
);

const handleCompare = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const exists = compareItems.find(
    (item) => item._id === product._id
  );

  if (exists) {
    return toast.error("Already added to compare");
  }

  if (compareItems.length >= 3) {
    return toast.error("Maximum 3 products can be compared");
  }

  dispatch(addToCompare(product));

  toast.success("Added to compare");
};

const { user, isAuthenticated } = useSelector((state) => state.auth);

const isWelcomeOfferActive =
  isAuthenticated &&
  user?.welcomeOffer &&
  user.welcomeOffer.isUsed === false &&
  user.welcomeOffer.expiresAt &&
  new Date(user.welcomeOffer.expiresAt) > new Date();

const finalPrice = isWelcomeOfferActive
  ? Math.round(
      product.price -
        (product.price * user.welcomeOffer.discountPercent) / 100
    )
  : product.price;

  return (
    <div
      className="
        group bg-white rounded-[2rem] overflow-hidden
        border border-pink-100
        shadow-sm hover:shadow-2xl
        hover:-translate-y-2
        transition-all duration-300
      "
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-pink-50">
        <img
           src={product.images?.[0]}
           alt={product.name}
          className="
            w-full h-full object-cover
            group-hover:scale-110
            transition-transform duration-500
          "
        />

        {/* Category Badge */}
        <span
          className="
            absolute top-4 left-4
            bg-white/90 backdrop-blur-md
            text-pink-600 text-xs font-semibold
            px-4 py-2 rounded-full
            shadow-sm
          "
        >
          {product.category}
        </span>

        {/* Rating */}
        <div
          className="
            absolute top-4 right-4
            bg-black/70 backdrop-blur-md
            text-white text-sm font-medium
            px-3 py-1.5 rounded-full
          "
        >
         ⭐ {product.rating?.toFixed(1) || "0.0"}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="
            text-xl font-bold text-gray-900
            group-hover:text-pink-600
            transition
          "
        >
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          Premium skincare product specially designed for glowing,
          hydrated and healthy skin.
        </p>

        {/* Price + Button */}
        {/* <div className="mt-6 flex items-center justify-between"> */}
        <div className="mt-6">
          <div>
            {isWelcomeOfferActive ? (
  <div>
    <div className="flex items-baseline gap-3">
      <p className="text-sm font-bold text-gray-400 line-through">
      ₹{product.price}
    </p>

    <p className="text-2xl font-black text-gray-900">
      ₹{finalPrice}
    </p>
    </div>

    <p className="text-xs font-black text-pink-600">
      Welcome Offer {user.welcomeOffer.discountPercent}% OFF
    </p>
  </div>
) : (
  <p className="text-2xl font-bold text-gray-900">
    ₹{product.price}
  </p>
)}

            <p className="text-sm text-green-600 font-medium">
              In Stock
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
  <button
    onClick={handleCompare}
    className="
      flex items-center justify-center gap-2
      h-12 rounded-2xl
      border border-pink-200
      bg-white
      text-pink-600
      font-semibold
      hover:bg-pink-50
      transition-all
    "
  >
    <GitCompareArrows size={18} />
    Compare
  </button>

  <button
    className="
      h-12 rounded-2xl
      bg-pink-600
      text-white
      font-semibold
      shadow-lg shadow-pink-200
      hover:bg-pink-700
      transition-all
    "
  >
    View Details
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;