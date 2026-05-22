const ProductCard = ({ product }) => {
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
          ⭐ {product.rating}
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
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ₹{product.price}
            </p>

            <p className="text-sm text-green-600 font-medium">
              In Stock
            </p>
          </div>

          <button
            className="
              px-5 py-3 rounded-full
              bg-pink-600 text-white
              font-medium
              hover:bg-pink-700
              shadow-lg shadow-pink-200
              transition-all
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;