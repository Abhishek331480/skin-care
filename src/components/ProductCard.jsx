const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-xl transition">
      <div className="h-56 bg-pink-100 flex items-center justify-center">
        <span className="text-pink-500 font-medium">Product Image</span>
      </div>

      <div className="p-5 space-y-3">
        <p className="text-sm text-pink-600 font-medium">
          {product.category}
        </p>

        <h3 className="text-lg font-bold text-gray-900">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-600">
            ⭐ {product.rating}
          </p>
        </div>

        <button className="w-full py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;