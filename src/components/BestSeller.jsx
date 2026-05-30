import React from "react";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { useDispatch ,useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import toast from "react-hot-toast";
const products = [
  {
    id: 1,
    name: "Glow Hydrating Face Wash",
    brand: "Derma Glow",
    category: "Cleanser",
    price: 499,
    oldPrice: 699,
    rating: 4.5,
    reviews: 128,
    stock: 20,
    skinType: "All Skin Types",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
    description:
      "Gentle face wash with hyaluronic acid that deeply cleanses and hydrates your skin.",
    ingredients: ["Hyaluronic Acid", "Aloe Vera", "Vitamin B5"],
    benefits: ["Deep Cleansing", "Hydration", "Soft Skin"],
    featured: true,
  },

  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    brand: "Skin Aura",
    category: "Serum",
    price: 899,
    oldPrice: 1199,
    rating: 4.8,
    reviews: 342,
    stock: 15,
    skinType: "Normal to Oily",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop",
    description:
      "Powerful Vitamin C serum that helps brighten dull skin and reduce pigmentation.",
    ingredients: ["Vitamin C", "Niacinamide", "Orange Extract"],
    benefits: ["Glow", "Brightening", "Dark Spot Reduction"],
    featured: true,
  },

  {
    id: 3,
    name: "Ultra Moisturizing Cream",
    brand: "PureSkin",
    category: "Moisturizer",
    price: 799,
    oldPrice: 999,
    rating: 4.6,
    reviews: 211,
    stock: 30,
    skinType: "Dry Skin",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
    description:
      "Rich moisturizing cream that locks hydration for 24 hours.",
    ingredients: ["Shea Butter", "Ceramides", "Glycerin"],
    benefits: ["Moisturizing", "Repair Barrier", "Smooth Texture"],
    featured: false,
  },

  {
    id: 4,
    name: "SPF 50 Sunscreen Gel",
    brand: "Sun Protect",
    category: "Sunscreen",
    price: 599,
    oldPrice: 799,
    rating: 4.7,
    reviews: 180,
    stock: 25,
    skinType: "Oily Skin",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
    description:
      "Lightweight sunscreen gel with SPF 50 PA+++ protection.",
    ingredients: ["Zinc Oxide", "Vitamin E", "Green Tea"],
    benefits: ["UV Protection", "Non Sticky", "Matte Finish"],
    featured: true,
  },

  {
    id: 5,
    name: "Night Repair Face Serum",
    brand: "LumiCare",
    category: "Night Care",
    price: 1099,
    oldPrice: 1399,
    rating: 4.9,
    reviews: 420,
    stock: 10,
    skinType: "All Skin Types",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    description:
      "Advanced overnight repair serum for glowing and youthful skin.",
    ingredients: ["Retinol", "Peptides", "Vitamin E"],
    benefits: ["Anti Aging", "Skin Repair", "Glow Boost"],
    featured: true,
  },

  {
    id: 6,
    name: "Charcoal Detox Face Mask",
    brand: "Nature Bliss",
    category: "Face Mask",
    price: 699,
    oldPrice: 899,
    rating: 4.4,
    reviews: 97,
    stock: 18,
    skinType: "Combination Skin",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop",
    description:
      "Deep detox charcoal mask that removes impurities and excess oil.",
    ingredients: ["Activated Charcoal", "Tea Tree", "Clay"],
    benefits: ["Detox", "Oil Control", "Pore Cleansing"],
    featured: false,
  },
];

const BestSeller = () => {
      const dispatch = useDispatch();
       // wishlist items from redux
  const wishlistItems = useSelector(
  (state) => state.wishlist.wishlistItems
);
const isWishlisted = wishlistItems.some(
  (item) => item.id === product?.id
);

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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-pink-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden bg-pink-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {product.stock <= 0 && (
  <span className="absolute left-4 top-16 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-xl">
    Out of Stock
  </span>
)}

                {product.featured && (
                  <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
                    Featured
                  </span>
                )}

                <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition">
                  <Heart size={18} />
                </button>
                {/* <button
    onClick={() => dispatch(toggleWishlist(product))}
    className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition"
  >
    <Heart
      size={22}
      className={isWishlisted ? "text-pink-600" : "text-gray-600"}
      fill={isWishlisted ? "currentColor" : "none"}
    />
  </button> */}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-pink-600">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold text-gray-800">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500">{product.brand}</p>

                <h3 className="mt-1 text-xl font-bold text-gray-900 group-hover:text-pink-600 transition">
                  {product.name}
                </h3>

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.benefits.slice(0, 3).map((benefit) => (
                    <span
                      key={benefit}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.oldPrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.reviews} reviews · {product.stock} left
                    </p>
                  </div>

                  <button className="h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-pink-600 transition">
                    <ShoppingBag size={20} />
                  </button>
                </div>

                {/* <button className="mt-5 w-full rounded-full bg-pink-600 text-white py-3 font-semibold hover:bg-pink-700 transition">
                  Add to Cart
                </button> */}
                <button
  disabled={product.stock <= 0}
  onClick={() => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  }}
  className="mt-5 w-full rounded-full bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
>
  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;