import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch ,useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();

  
  //  dummy data for products
  const products = [
    {
      id: 1,
      name: "Vitamin C Serum",
      category: "Serum",
      price: 499,
      rating: 4.8,
      description:
        "A brightening serum that helps reduce dullness and gives your skin a natural glow.",
    },
    {
      id: 2,
      name: "Vitamin E Serum",
      category: "Sunscreen",
      price: 499,
      rating: 4.8,
      description:
        "A nourishing formula that helps protect and hydrate your skin deeply.",
    },
    {
      id: 3,
      name: "Hyaluronic Acid Serum",
      category: "Moisturizer",
      price: 499,
      rating: 4.8,
      description:
        "Hydrates skin, improves softness, and helps maintain moisture barrier.",
    },
    {
      id: 4,
      name: "Niacinamide Serum",
      category: "Cleanser",
      price: 499,
      rating: 4.8,
      description:
        "Helps improve uneven skin tone, pores, and overall skin texture.",
    },
  ];

  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  // wishlist items from redux
  const wishlistItems = useSelector(
  (state) => state.wishlist.wishlistItems
);
const isWishlisted = wishlistItems.some(
  (item) => item.id === product?.id
);


  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link to="/shop" className="mt-4 text-pink-600 font-medium">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="h-[450px] rounded-3xl bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
          <div className="h-56 w-36 rounded-3xl bg-white shadow-xl border border-pink-100" />
        </div>
        
        <div className="relative space-y-6 bg-white/80 backdrop-blur-xl border border-pink-100 rounded-[2rem] p-6 sm:p-8 shadow-xl">
  <button
    onClick={() => dispatch(toggleWishlist(product))}
    className="absolute top-6 right-6 h-11 w-11 rounded-full border border-pink-100 bg-white shadow-sm flex items-center justify-center hover:bg-pink-50 transition"
  >
    <Heart
      size={22}
      className={isWishlisted ? "text-pink-600" : "text-gray-600"}
      fill={isWishlisted ? "currentColor" : "none"}
    />
  </button>

  <p className="inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
    {product.category}
  </p>

  <h1 className="pr-12 text-4xl sm:text-5xl font-bold text-gray-950 leading-tight">
    {product.name}
  </h1>

  <div className="flex items-center gap-3">
    <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
      ⭐ {product.rating}
    </span>
    <span className="text-sm text-gray-500">Premium skincare product</span>
  </div>

  <p className="text-4xl font-bold text-gray-950">₹{product.price}</p>

  <p className="text-gray-600 leading-8 text-base">
    {product.description}
  </p>

  <div className="flex flex-col sm:flex-row gap-4 pt-4">
    <button
      onClick={() => dispatch(addToCart(product))}
      className="flex-1 rounded-full bg-black px-7 py-4 text-white font-semibold shadow-lg hover:bg-gray-900 transition"
    >
      Add to Cart
    </button>

    <button className="flex-1 rounded-full border border-pink-200 bg-pink-50 px-7 py-4 text-pink-700 font-semibold hover:bg-pink-100 transition">
      Buy Now
    </button>
  </div>
</div>
      </div>
    </section>
  );
};

export default ProductDetails;
