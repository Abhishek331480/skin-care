import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store/slices/cartSlice";
import { setWishlist } from "../store/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import api from "../api/api";
import RecentlyViewed from "../components/RecentlyViewed";
import { GitCompareArrows } from "lucide-react";
import { addToCompare } from "../store/slices/compareSlice";

const ProductDetails = () => {
 
  const { id } = useParams();
  const dispatch = useDispatch();

  const compareItems = useSelector(
  (state) => state.compare.compareItems
);

      const { user, isAuthenticated } = useSelector(
  (state) => state.auth
);


  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  // review states
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const isWishlisted = wishlistItems.some((item) => item._id === product?._id);

  
const isWelcomeOfferActive =
  isAuthenticated &&
  user?.welcomeOffer &&
  user.welcomeOffer.isUsed === false &&
  user.welcomeOffer.expiresAt &&
  new Date(user.welcomeOffer.expiresAt) > new Date();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        const productRes = await api.get(`/products/${id}`);
        const currentProduct = productRes.data.product;

        setProduct(currentProduct);
        setSelectedImage(currentProduct.images?.[0]);

        if (currentProduct.variants?.length > 0) {
          setSelectedVariant(currentProduct.variants[0]);
        }

        const oldViewed =
          JSON.parse(localStorage.getItem("recentlyViewed")) || [];

        const filteredViewed = oldViewed.filter(
          (item) => item._id !== currentProduct._id,
        );

        const updatedViewed = [currentProduct, ...filteredViewed].slice(0, 4);

        localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));

        const allRes = await api.get("/products");

        const related = allRes.data.products.filter(
          (item) =>
            item.category === currentProduct.category &&
            item._id !== currentProduct._id,
        );

        setRelatedProducts(related);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  //review function
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      setReviewLoading(true);

      const res = await api.post(`/products/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewComment,
      });

      toast.success(res.data.message);

      setProduct(res.data.product);
      setReviewComment("");
      setReviewRating(5);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await api.post(`/wishlist/${product._id}`);

      dispatch(setWishlist(res.data.wishlist));

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Wishlist update failed");
    }
  };

  const handleAddToCart = async () => {
    try {
      const cartKey = selectedVariant
        ? `${product._id}-${selectedVariant.size}`
        : product._id;

      const res = await api.post("/cart", {
        productId: product._id,
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

      toast.success(
        selectedVariant
          ? `${product.name} (${selectedVariant.size}) added to cart`
          : `${product.name} added to cart`,
        {
          id: "cart-toast",
          duration: 1500,
        },
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add cart");
    }
  };

  const handleCompare = () => {
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

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

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
  const productReviews = Array.isArray(product?.reviews) ? product.reviews : [];

  const displayPrice = selectedVariant?.price || product.price;
  const displayStock =
    selectedVariant?.stock !== undefined
      ? selectedVariant.stock
      : product.stock;

      
// const finalPrice = isWelcomeOfferActive
//   ? Math.round(
//       product.price -
//         (product.price *
//           user.welcomeOffer.discountPercent) /
//           100
//     )
//   : product.price;

const finalPrice = isWelcomeOfferActive
  ? Math.round(
      displayPrice -
        (displayPrice * user.welcomeOffer.discountPercent) / 100
    )
  : displayPrice;
  
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="relative h-[450px] rounded-3xl overflow-hidden bg-pink-50 shadow-xl border border-pink-100">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {displayStock <= 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                Out of Stock
              </span>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <span className="absolute top-5 left-5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-pink-600 shadow">
              {product.category}
            </span>
          </div>

          <div className="relative flex gap-3 mt-4 flex-wrap">
            {product.images?.map((img) => (
              <img
                key={img}
                src={img}
                alt="thumbnail"
                onClick={() => setSelectedImage(img)}
                className={`h-24 w-24 rounded-2xl object-cover cursor-pointer border-2 transition ${
                  selectedImage === img
                    ? "border-pink-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative space-y-6 bg-white/80 backdrop-blur-xl border border-pink-100 rounded-[2rem] p-6 sm:p-8 shadow-xl">
          <button
            onClick={handleWishlist}
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
            <span className="text-sm text-gray-500">
              Premium skincare product
            </span>
          </div>

        {/* {isWelcomeOfferActive ? (
  <div>
    <p className="text-lg font-semibold text-gray-400 line-through">
      ₹{product.price}
    </p>

    <p className="text-4xl font-black text-gray-950">
      ₹{finalPrice}
    </p>

    <span className="mt-2 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-600">
      🎉 {user.welcomeOffer.discountPercent}% OFF Welcome Offer
    </span>
  </div>
) : (
  <p className="text-4xl font-black text-gray-950">
    ₹{product.price}
  </p>
)} */}

{isWelcomeOfferActive ? (
  <div>
    <p className="text-lg font-semibold text-gray-400 line-through">
      ₹{displayPrice}
    </p>

    <p className="text-4xl font-black text-gray-950">
      ₹{finalPrice}
    </p>

    <span className="mt-2 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-black text-pink-600">
      🎉 {user.welcomeOffer.discountPercent}% OFF Welcome Offer
    </span>
  </div>
) : (
  <p className="text-4xl font-black text-gray-950">
    ₹{displayPrice}
  </p>
)}
          {product.variants?.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id || variant.size}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`rounded-full border px-5 py-3 text-sm font-bold transition ${
                      selectedVariant?.size === variant.size
                        ? "border-pink-600 bg-pink-600 text-white"
                        : "border-pink-100 bg-pink-50 text-pink-700 hover:border-pink-300"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-gray-600 leading-8 text-base">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-xs text-gray-500">Skin Type</p>
              <p className="font-semibold text-gray-900">{product.skinType}</p>
            </div>

            <div className="rounded-2xl bg-pink-50 p-4">
              <p className="text-xs text-gray-500">Stock</p>
              <p className="font-semibold text-gray-900">{displayStock} left</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Key Benefits
            </h3>

            <div className="flex flex-wrap gap-2">
              {product.benefits?.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Ingredients
            </h3>

            <div className="flex flex-wrap gap-2">
              {product.ingredients?.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
  <button
    onClick={handleCompare}
    className="
      flex items-center justify-center gap-2
      rounded-full border border-pink-200
      px-6 py-4 font-semibold
      text-pink-600
      hover:bg-pink-50
      transition
    "
  >
    <GitCompareArrows size={18} />
    Compare
  </button>

  <button
    disabled={displayStock <= 0}
    onClick={handleAddToCart}
    className="
      cursor-pointer flex-1 rounded-full
      bg-black px-7 py-4 font-semibold
      text-white shadow-xl transition
      hover:bg-gray-900
      disabled:cursor-not-allowed
      disabled:bg-gray-300
      disabled:text-gray-500
    "
  >
    {displayStock <= 0 ? "Out of Stock" : "Add to Cart"}
  </button>
</div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-pink-600 uppercase tracking-wider">
                Recommended
              </p>

              <h2 className="text-4xl font-bold text-gray-950 mt-2">
                You May Also Like
              </h2>
            </div>

            <Link
              to="/shop"
              className="hidden sm:flex rounded-full border border-pink-200 px-5 py-3 text-sm font-semibold text-pink-700 hover:bg-pink-50 transition"
            >
              View All
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="group bg-white border border-pink-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-950">
                    {item.name}
                  </h3>

                  <p className="text-2xl font-bold text-gray-950 mt-4">
                    ₹{item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <RecentlyViewed />
      
      {/* product review code */}
       <div className="mt-20">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[4px] text-pink-600">
            Customer Feedback
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-950">
            Reviews & Ratings
          </h2>

          <p className="mt-3 text-gray-500">
            ⭐ {product.rating || 0} / 5 ({product.numReviews || 0} reviews)
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* Review Cards */}
          <div className="space-y-5">
            {productReviews.length === 0 ? (
              <div className="rounded-[2rem] border border-pink-100 bg-white p-8 text-center shadow-xl">
                <h3 className="text-2xl font-bold text-gray-950">
                  No reviews yet
                </h3>
                <p className="mt-2 text-gray-500">
                  Be the first to review this product.
                </p>
              </div>
            ) : (
              productReviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm hover:shadow-xl transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                        {review.username?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-950">
                          {review.username}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Verified Customer
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-700">
                      ⭐ {review.rating}
                    </span>
                  </div>

                  <p className="mt-5 leading-8 text-gray-600">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
